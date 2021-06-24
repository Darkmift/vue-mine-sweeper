<template>
	<div
		ref="el"
		:style="elComputedStyle"
		class="cell flex j-center a-center"
		:class="elClassComputed"
		@click="handleClick"
	>
		{{ renderContent }}
	</div>
</template>

<style scoped lang="scss">
.cell {
	flex: 1 1;
	font-size: 50px;

	&.covered {
		@include main-border;
		&:active {
			@include main-border-inverted;
		}
	}
	&.shown {
		@include main-border-inverted;
	}
}
</style>

<script>
import {
	ref,
	toRefs,
	// reactive,
	computed,
	onMounted,
	getCurrentInstance,
} from "vue";
export default {
	name: "Cell",
	props: {
		rowCount: { type: Number, required: true },
		cellData: { type: Object, required: true },
	},
	setup(props) {
		// DATA
		const el = ref(null);
		const elComputedStyle = ref("");
		const { cellData } = toRefs(props);
		console.log(
			"🚀 ~ file: Cell.vue ~ line 43 ~ setup ~ cellData",
			cellData.value
		);

		// COMPUTED
		const elClassComputed = computed(() => {
			return {
				covered: !cellData.value.isShown,
				shown: cellData.value.isShown,
			};
		});

		const renderContent = computed(() => {
			const BOMB = "💣";
			// const FLAG = "🏁";
			const EMPTY = " ";
			if (!cellData.value.isShown) {
				return EMPTY;
			}
			if (cellData.value.isMine) {
				return BOMB;
			}

			return cellData.value.minesAroundCount;
		});

		// METHODS
		function handleClick() {
			console.log({ cellData: cellData.value });
			cellData.value.isShown = true;
		}

		// HOOKS
		onMounted(() => {
			const { width } = el.value.getBoundingClientRect();
			const instance = getCurrentInstance();

			const boardElHeight = instance.parent.refs.boardEl.clientHeight;
			const height = (boardElHeight / props.rowCount) * 1.85;

			elComputedStyle.value = {
				fontSize: `${(width / 100) * 55}px`,
				height: `${height < width ? width : height}px`,
			};
		});
		return { el, elComputedStyle, elClassComputed, renderContent, handleClick };
	},
};
</script>