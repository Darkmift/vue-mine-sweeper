<template>
	<div class="board">
		<top-bar />
	</div>
</template>

<style scoped lang="scss">
.board {
	@extend .main-border;
}
</style>

<script>
import TopBar from "./TopBar";
export default { name: "Board", components: { TopBar } };
</script>