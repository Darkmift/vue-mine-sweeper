<template>
	<div
		ref="el"
		:style="elComputedStyle"
		class="cell flex j-center a-center"
		:class="elClassComputed"
		@click="handleClick"
		@contextmenu.prevent="flagMine"
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
	&.boom {
		@include main-border-inverted;
		background-color: #ff0000;
	}
}
</style>

<script>
import { useStore } from "vuex";
import {
	ref,
	reactive,
	computed,
	onMounted,
	onUpdated,
	onUnmounted,
} from "vue";
export default {
	name: "Cell",
	props: {
		rowCount: { type: Number, required: true },
		cellCoords: { type: Object, required: true },
	},
	setup(props) {
		// DATA
		const el = ref(null);
		const elComputedStyle = reactive({});

		const store = useStore();

		// COMPUTED
		const cellData = computed(() => store.getters.cell(props.cellCoords));
		const elClassComputed = computed(() => {
			return {
				covered: !cellData.value.isShown,
				shown: cellData.value.isShown,
				boom: cellData.value.isShown && cellData.value.isMine,
			};
		});

		const renderContent = computed(() => {
			const BOMB = "💣";
			const FLAG = "🏁";
			const EMPTY = " ";

			if (!cellData.value.isShown && cellData.value.isMarked) {
				return FLAG;
			}

			if (!cellData.value.isShown) {
				return EMPTY;
			}
			if (cellData.value.isMine) {
				return BOMB;
			}

			return cellData.value.minesAroundCount || EMPTY;
		});
		const gameData = computed(() => store.getters.game);

		// METHODS
		function handleClick() {
			if (gameData.value.isOver) return;
			cellData.value.isShown = true;
			cellData.value.isMarked = false;
			if (cellData.value.minesAroundCount === 0) {
				store.commit({
					type: "revealAdjacentEmptyCells",
					location: cellData.value.location,
				});
			}
			if (cellData.value.isMine) return store.commit("gameOver");
			_handleTimer();
			store.commit("checkIfVictory");
		}

		function flagMine() {
			if (cellData.value.isShown || gameData.value.isOver) {
				cellData.value.isMarked = false;
				return;
			}
			cellData.value.isMarked = !cellData.value.isMarked;
			_handleTimer();
			store.commit("checkIfVictory");
		}

		function _handleTimer() {
			if (gameData.value.isOver || gameData.value.timer.intervalAnchor) return;
			store.commit("startTimer");
		}

		function _renderCell() {
			const { width } = el.value.getBoundingClientRect();
			const height = (window.innerHeight * 0.75) / props.rowCount;

			const { minesAroundCount } = cellData.value;
			const colors = [
				"#000",
				"#4299e1",
				"#48bb78",
				"#f56565",
				"#bd3131",
				"#701a1a",
				"#4b1414",
				"#270c0c",
				"#130808",
			];

			elComputedStyle.fontSize = `${(width / 100) * 55}px`;
			elComputedStyle.height = `${height > width ? width : height}px`;
			elComputedStyle.color = colors[minesAroundCount];
		}

		// HOOKS
		onMounted(_renderCell);

		window.addEventListener("resize", _renderCell);
		onUnmounted(() => window.removeEventListener("resize", _renderCell));
		// on board change
		onUpdated(_renderCell);

		return {
			el,
			elComputedStyle,
			elClassComputed,
			renderContent,
			handleClick,
			flagMine,
		};
	},
};
</script>