<template>
	<div class="main-container flex column j-center a-center">
		<h3>Minesweeper</h3>
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
	width: 100vw;
	height: 100vh;
	.main-container {
		padding: 20px;
	}
}
</style>
