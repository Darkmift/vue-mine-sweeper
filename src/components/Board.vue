<template>
	<div class="board">
		<div class="row flex" v-for="(row, i) in level.rows" :key="i">
			<cell class="cell" v-for="(cell, j) in level.rows" :key="j"></cell>
		</div>
	</div>
</template>

<style scoped lang="scss">
.board {
	margin-top: 10px;
}
</style>

<script>
import Cell from "./Cell";
export default {
	name: "Board",
	props: {
		level: { type: Object, required: true },
	},
	components: { Cell },
};
</script>