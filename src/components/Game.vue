<template>
	<div class="game" @contextmenu.prevent="rightClickHandler">
		<top-bar :totalMines="level.mines" />
		<board :level="level" />
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
import { useStore } from "vuex";
import { computed } from "vue";

import TopBar from "./TopBar";
import Board from "./Board";
export default {
	name: "Game",
	setup() {
		// DATA

		const store = useStore();
		store.commit({ type: "setBoard", level: "brutal" });
		let level = computed(() => store.getters.level);

		// METHODS
		function setLevel(levelName) {
			store.commit({ type: "setBoard", levelName });
		}

		function rightClickHandler() {
			console.log("context-menu disabled");
		}

		return { level, rightClickHandler, setLevel };
	},
	components: { TopBar, Board },
};
</script>