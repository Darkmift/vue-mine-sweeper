<template>
	<div class="board">
		<top-bar />
	</div>
</template>

<style scoped lang="scss">
.board {
	@extend .main-border;
	background: $clr1;
}
</style>

<script>
import TopBar from "./TopBar";
export default { name: "Board", components: { TopBar } };
</script>