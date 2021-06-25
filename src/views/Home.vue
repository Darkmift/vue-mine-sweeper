<template>
	<div class="home">
		<bubble-menu />
		<game />
	</div>
</template>

<script>
import Game from "@/components/Game";
import BubbleMenu from "@/components/BubbleMenu";
export default {
	name: "Home",
	components: {
		Game,
		BubbleMenu,
	},
};
</script>
