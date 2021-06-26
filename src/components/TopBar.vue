<template>
	<div class="top-bar flex j-between a-stretch">
		<div class="display-mines">
			<h1>{{ flaggedCells }}</h1>
		</div>
		<button class="status-emoji" @click="resetGame">
			<span>{{ emoji }}</span>
		</button>
		<div class="timer">
			<h1>{{ game.timer.timerToString }}</h1>
		</div>
	</div>
</template>

<style scoped lang="scss">
.top-bar {
	min-width: 50vw;

	.display-mines,
	.timer,
	.status-emoji {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 14vw;
		padding: 0 30px;
		letter-spacing: -3px;
	}

	.display-mines,
	.timer {
		background: #262626;
		border: 5px solid;
		border-color: #7c8a76 #e2e8ce #e2e8ce #7c8a76;
		color: #ff7f11;
	}

	.status-emoji {
		padding-top: 5px;
		background: transparent;
		width: max-content;
		@extend .main-border;
		outline: none;
		font-size: 2.1em;
		cursor: pointer;
		line-height: 100%;
		span {
			padding: 5px;
		}

		&:active {
			@extend .main-border-inverted;
		}
	}
}
</style>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
	name: "Top-Bar",
	setup() {
		const store = useStore();
		const game = computed(() => store.getters.game);
		const flaggedCells = computed(
			() => store.getters.board.flat(1).filter((cell) => cell.isMarked).length
		);

		const EMOJI_OPTION = {
			default: "🙂",
			clicking: "😬",
			hovering: "🤔",
			gameOver: "😵",
		};
		const emoji = ref(EMOJI_OPTION.default);

		function resetGame() {
			store.commit("resetGame");
			emoji.value = EMOJI_OPTION.default;
		}

		return { game, flaggedCells, resetGame, emoji };
	},
};
</script>