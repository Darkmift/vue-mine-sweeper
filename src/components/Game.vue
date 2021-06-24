<template>
	<div class="game">
		<top-bar :totalMines="totalMines" />
		<board :level="level" :boardMatrix="boardMatrix" />
	</div>
</template>

<style scoped lang="scss">
.game {
	@include main-border;
	padding: 1vmin;
	background: $clr1;
}
</style>

<script>
// import { useStore } from "vuex";
import { /*ref,*/ computed, reactive } from "vue";

import { buildBoard } from "@/utils/initBoard.js";

import TopBar from "./TopBar";
import Board from "./Board";
export default {
	name: "Game",
	setup() {
		// DATA
		const levels = reactive({
			easy: { rows: 4, mines: 4 },
			medium: { rows: 8, mines: 12 },
			hard: { rows: 12, mines: 30 },
			brutal: { rows: 16, mines: 48 },
		});
		let level = levels.easy;
		const totalMines = computed(() => level.mines);
		const boardMatrix = buildBoard(level);
		// METHODS
		function setLevel(levelName) {
			level = levels[levelName];
		}

		// const boardMatrix = buildBoard(level);
		// const store = useStore();
		// store.commit({ type: "setBoard", boardMatrix });

		return { level, totalMines, setLevel, boardMatrix };
	},
	components: { TopBar, Board },
};
</script>