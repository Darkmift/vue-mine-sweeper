<template>
	<div class="board" ref="boardEl">
		<div class="row flex" v-for="(row, i) in level.rows" :key="i">
			<cell
				class="cell"
				:rowCount="level.rows"
				v-for="(cell, j) in level.rows"
				:key="j"
				:cellCoords="{ i, j }"
			></cell>
		</div>
	</div>
</template>

<style scoped lang="scss">
.board {
	margin-top: 10px;
}
</style>

<script>
import { ref } from "vue";
import Cell from "./Cell";
export default {
	name: "Board",
	props: {
		level: { type: Object, required: true },
	},
	setup() {
		const boardEl = ref(null);
		return { boardEl };
	},
	components: { Cell },
};
</script>