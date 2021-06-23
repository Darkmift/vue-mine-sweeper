<template>
	<div class="top-bar flex j-between a-stretch">
		<div class="display-mines"><h1>20</h1></div>
		<button class="status-emoji"><span>🙂</span></button>
		<div class="timer"><h1>00:00</h1></div>
	</div>
</template>

<style scoped lang="scss">
.top-bar {
	min-width: 50vw;

	.box-size {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 14vw;
		padding: 0 30px;
		letter-spacing: -3px;
	}

	.display-mines,
	.timer {
		@extend .box-size;
		background: #262626;
		border: 5px solid;
		border-color: #7c8a76 #e2e8ce #e2e8ce #7c8a76;
		color: #ff7f11;
	}

	.status-emoji {
		@extend .box-size;
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
export default { name: "Top-Bar" };
</script>