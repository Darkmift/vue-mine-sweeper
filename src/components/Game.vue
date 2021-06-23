<template>
	<div class="game">
		<top-bar :totalMines="totalMines" />
		<board :level="level" />
	</div>
</template>

<style scoped lang="scss">
.game {
	@extend .main-border;
	padding: 1vmin;
	background: $clr1;
}
</style>

<script>
import { /*ref,*/ computed, reactive } from "vue";

import TopBar from "./TopBar";
import Board from "./Board";
export default {
	name: "Game",
	setup() {
		const levels = reactive({
			easy: { rows: 4, mines: 4 },
			medium: { rows: 8, mines: 12 },
			hard: { rows: 12, mines: 30 },
			brutal: { rows: 16, mines: 48 },
		});
		let level = levels.easy;
		const totalMines = computed(() => level.mines);
		function setLevel(levelName) {
			level = levels[levelName];
		}
		return { level, totalMines, setLevel };
	},
	components: { TopBar, Board },
};
</script>