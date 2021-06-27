<template>
	<ul class="bubble-menu">
		<li @click="setLevel('easy')">1</li>
		<li @click="setLevel('medium')">2</li>
		<li @click="setLevel('hard')">3</li>
		<li @click="setLevel('brutal')">4</li>
	</ul>
</template>

<style scoped lang="scss">
@use "sass:color";
$size: 70px;
$offsetAmount: 1.1;
$transitionTime: 0.12s;

$offset: 20%;
$colors: #004db3, #26b85a, #ffcb00, #d88e8e;
$transforms: translate(0, -$offset), translate($offset, 0),
	translate(0, $offset), translate(-$offset, 0);
.bubble-menu {
	display: block;
	margin: 50px auto 0;
	width: $size;
	height: $size;
	padding: 0;
	position: fixed;
	top: 3vmin;
	left: 3vmin;

	&:hover {
		height: (4 * $offsetAmount) * $size;

		li {
			color: white;
		}

		@for $i from 1 through 4 {
			li:nth-child(#{$i}) {
				transform: translate(0, ($i - 1) * ($offsetAmount * 100%));

				&:hover {
					opacity: 1;
					transition-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
					transform: translate(0, ($i - 1) * ($offsetAmount * 100%))
						scale(1.15, 1.15);
					transition-duration: $transitionTime * 2;
				}
			}

			li:nth-child(#{$i}):after {
				opacity: 1;
				transition-delay: ($transitionTime/1.5) * $i;
			}
		}
	}

	li {
		display: block;
		width: $size;
		height: $size;
		background-color: blue;
		border-radius: 50%;
		opacity: 0.6;
		mix-blend-mode: screen;
		position: absolute;
		top: 0;
		left: 0;
		transition: transform $transitionTime ease-out,
			opacity $transitionTime ease-out, color $transitionTime ease-out;
		cursor: pointer;
		text-align: center;
		line-height: $size;
		color: white;
		font-family: "fontawesome";
		color: transparent;
		&:first-child:after {
			display: none;
		}
	}

	@for $i from 1 through 4 {
		li:nth-child(#{$i}) {
			background-color: nth($colors, $i);
			transform: nth($transforms, $i);
			z-index: 4 - $i;
			transition-duration: $transitionTime * $i;
		}
	}
}
</style>

<script>
import { useStore } from "vuex";
export default {
	name: "Bubble-Menu",
	setup() {
		const store = useStore();

		function setLevel(levelName) {
			store.commit("resetGame");
			store.commit({ type: "setBoard", levelName });
		}

		return { setLevel };
	},
};
</script>