<template>
	<img class="img" :src="src" :alt="alt" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Image",
	props: {
		src: String,
		alt: String,
	},
});
</script>

<style lang="scss" scoped>
.img {
	max-width: 100%;
}
</style>

