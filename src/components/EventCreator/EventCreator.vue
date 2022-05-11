<template>
	<template></template>
</template>

<script lang="ts">
import { Coordinates } from "@/models/Coordinates";
import { getRandomValue } from "@/utils/getRandomValue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "EventCreator",
	emits: ["custom"],
	methods: {
		emitEventsWithRandomInterval() {
			setTimeout(() => {
				const randomCoords: Coordinates = {
					x: getRandomValue(0, window.innerWidth),
					y: getRandomValue(0, window.innerHeight),
				};

				this.$emit("custom", randomCoords);

				return this.emitEventsWithRandomInterval();
			}, getRandomValue(10000, 40000));
		},
	},

	created() {
		this.emitEventsWithRandomInterval();
	},
});
</script>

<style lang="scss" scoped>
</style>

