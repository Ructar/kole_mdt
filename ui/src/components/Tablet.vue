<template>
	<div class="tablet">
		<q-layout container class="content screen">
		<Systembar/>
		<router-view/>
		</q-layout>
	</div>
</template>

<script>
import Systembar from './Systembar.vue'
export default {
	name: "tablet",
	components: {
	Systembar
	},
	computed: {
		isHome() {
			return this.$route.path === "/";
		},
	}
}
</script>

<style lang="scss">
	.tablet {
		position: absolute;
		bottom: -700px;
		top: 0;
		bottom: 0;
		right: 0;
		left:0;
		display: block;
		margin: auto;
		border: 0.5px solid rgba(255, 255, 255, 0.7);
		border-style: outset;
		background-color: #121212;
		width: 1200px;
		height: 781px;
		border-radius: 25px;
		padding: 4px 4px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); 
		transition: 0.75s all ease-in-out;

		.screen {
			position: relative;
			display: block;
			background-image: url("../assets/images/galaxybg.jpg");
			background-size: cover;
			width: 100%;
			height: 100%;
			border-radius: 19px;
			overflow: hidden;

		&:after {
			content: "";
			width: 30px;
			height: 100%;
			background: rgba(255, 255, 255, 0);
			position: absolute;
			left: 0px;
			pointer-events: none;
		}

		.notch {
			width: 15px;
			height: 15px;
			background: black;
			margin: auto;
			position: absolute;
			right: 15px;
			top: 10px;
			border-radius: 10px;
			z-index: 10;
		}

		.left-glare,
		.right-glare {
			position: absolute;
			left: 0px;
			width: 12.6px;
			height: 100%;
			opacity: 0.75;
			background-image: linear-gradient(to right, #9E9E9E, transparent);
			border-radius: 70px 0 0 70px;
			z-index: 4;
		}

		.right-glare {
			right: 0;
			left: auto;
			background-image: linear-gradient(to left, #9E9E9E, transparent);
			border-radius: 0 70px 70px 0;
		}
	}
}


</style>