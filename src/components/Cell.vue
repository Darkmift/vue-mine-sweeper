<template>
	<div ref="el" :style="elComputedStyle" class="cell flex j-center a-center">
		🚩
	</div>
</template>

<style scoped lang="scss">
.cell {
	@extend .main-border;
	flex: 1 1;
	font-size: 50px;
	&:active {
		@extend .main-border-inverted;
	}
}
</style>

<script>
import { ref, onMounted /*,nextTick*/ } from "vue";
export default {
	name: "Cell",
	setup() {
		const el = ref(null);
		const elComputedStyle = ref("");
		onMounted(() => {
			const { width } = el.value.getBoundingClientRect();
			elComputedStyle.value = {
				fontSize: `${(width / 100) * 55}px`,
				height: width + "px",
			};
		});
		return { el, elComputedStyle };
	},
};
</script>