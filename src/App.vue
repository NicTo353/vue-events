<template>
	<div class="container" @click="clearProfiles">
		<Profile
			v-for="(profile, index) in profiles"
			:key="index"
			:profile="profile"
		/>
		<EventCreator @custom="handleCustomEvent" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Profile from "./components/Profile/Profile.vue";
import EventCreator from "./components/EventCreator/EventCreator.vue";

import { mapActions, mapMutations, mapState } from "vuex";
import { ActionTypes, MutationTypes, State } from "./store/types";
import { Coordinates } from "./models/Coordinates";

export default defineComponent({
	name: "App",

	components: {
		Profile,
		EventCreator,
	},

	computed: mapState({
		profiles: (state) => {
			return (state as State).profiles;
		},
	}),

	methods: {
		...mapActions([ActionTypes.updateUsersAsync, ActionTypes.addProfileAsync]),
		...mapMutations([MutationTypes.clearProfiles]),

		handleCustomEvent(eventParams: Coordinates) {
			this.addProfileAsync(eventParams);
		},
	},

	created() {
		this.updateUsersAsync();
	},
});
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	overflow: hidden;
	background-color: #5a8c999f;
}
</style>