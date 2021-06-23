<template>
	<div ref="el" :style="elComputedStyle" class="cell flex j-center a-center">
		🚩
	</div>
</template>

<style scoped lang="scss">
.cell {
	@include main-border;
	flex: 1 1;
	font-size: 50px;
	&:active {
		@include main-border-inverted;
	}
}
</style>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
export default {
	name: "Cell",
	props: { rowCount: { type: Number, required: true } },
	setup(props) {
		const el = ref(null);
		const elComputedStyle = ref("");
		onMounted(() => {
			const { width } = el.value.getBoundingClientRect();
			const instance = getCurrentInstance();

			const boardElHeight = instance.parent.refs.boardEl.clientHeight;
			const height = (boardElHeight / props.rowCount) * 1.85;

			elComputedStyle.value = {
				fontSize: `${(width / 100) * 55}px`,
				height: `${height}px`,
			};
		});
		return { el, elComputedStyle };
	},
};
</script>