<template>
	<div class="q-pa-lg">
		<div class="row">
			<div class="col-6" v-for="app in apps" :key="app.name">
				<q-btn
					class="glossy"
					round
					:color="app.color"
					:icon="app.icon"
					:to="app.route"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
	name: 'home',
	data: () => ({
		appSpace: {
			"tablet": 3,
			"phone": 4
		},
	}),
	computed: {
		...mapState(["device"]),
		...mapGetters(["isTablet", "apps"]),

		deviceSpace() {
			return this.appSpace[this.device];
		},
	},
	methods: {
	}
}
</script>

<style lang="scss">
	.main {
		width: 100%;
		max-width: 100%;
	}
</style>