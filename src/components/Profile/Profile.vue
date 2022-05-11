<template>
	<div
		class="wrapper"
		@click.stop=""
		:style="{
			position: 'absolute',
			left: profile.leftTopCornerCords.x + 'px',
			top: profile.leftTopCornerCords.y + 'px',
		}"
	>
		<p>{{ profile.id }}</p>
		<p>{{ profile.name }}</p>
		<p>{{ profile.email }}</p>
		<Image :src="profile.photoUrl" :alt="'Ошибка загрузки фото'" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Image from "../Image/Image.vue";

export default defineComponent({
	name: "Profile",

	components: {
		Image,
	},
	props: {
		profile: {
			id: Number,
			name: String,
			email: String,
			photoUrl: String,
			leftTopCornerCords: {
				x: Number,
				y: Number,
				required: true,
			},
			required: true,
		},
	},

	created() {
		console.log(this.profile);
	},
});
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	max-width: 300px;
	min-height: 300px;
	padding: 10px;
	border-radius: 5px;
	background-color: #c4c4c4;
	animation: fadeIn 1s ease;
	border: 1px solid #888888;
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.fade-enter {
	animation: fadeIn 0.2s ease-in;
}
</style>

