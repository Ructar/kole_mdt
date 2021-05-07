<template>
	<div class="row main">
		<q-bar class="bg-blue-9 text-white fit">
			Mobile Data Terminal
			<q-spacer/>
			<q-tabs
				v-model="nav"
				dense
			>
				<q-btn flat dense size="2px" v-for="nav in navigation" :key="nav.name" :to="nav.path"> 
					<q-tab :name="nav.name" :label="nav.name">
					</q-tab>
				</q-btn>
			</q-tabs>
		</q-bar>
		<q-layout container style="height:710px">
			<router-view/>
		</q-layout>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'police.index',
		data: () => ({
			nav: "Home",
		}),
		computed: {
			...mapGetters(["appData"]),
			navigation() {
				return this.appData("navigation")[1]
			}
		},
		methods: {
		},
	}
</script>

<style scoped>
	.main {
		background-color: rgb(255, 255, 255);
		width: 100%;
	}
</style>