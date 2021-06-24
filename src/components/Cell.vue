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
import { ref, computed, onMounted, getCurrentInstance } from "vue";
export default {
	name: "Cell",
	props: {
		rowCount: { type: Number, required: true },
		cellCoords: { type: Object, required: true },
	},
	setup(props) {
		// DATA
		const el = ref(null);
		const elComputedStyle = ref("");

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

			return cellData.value.minesAroundCount || "";
		});

		// METHODS
		function handleClick() {
			cellData.value.isShown = true;
			if (cellData.value.isMine) store.commit("gameOver");
		}
		function flagMine() {
			cellData.value.isMarked = !cellData.value.isMarked;
		}

		// HOOKS
		onMounted(() => {
			const { width } = el.value.getBoundingClientRect();
			const instance = getCurrentInstance();

			const boardElHeight = instance.parent.refs.boardEl.clientHeight;
			const height = (boardElHeight / props.rowCount) * 1.85;

			const { minesAroundCount } = cellData.value;
			let fontColor = "#000";
			switch (minesAroundCount) {
				case 1:
					fontColor = "#4299e1";
					break;
				case 2:
					fontColor = "#48bb78";
					break;
				case 3:
					fontColor = "#f56565";
					break;
				case 4:
					fontColor = "#bd3131";
					break;
				case 5:
					fontColor = "#701a1a";
					break;
				case 6:
					fontColor = "#4b1414";
					break;
				case 7:
					fontColor = "#270c0c";
					break;
				case 8:
					fontColor = "#130808";
					break;
			}

			elComputedStyle.value = {
				fontSize: `${(width / 100) * 55}px`,
				height: `${height < width ? width : height}px`,
				color: fontColor,
			};
		});

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