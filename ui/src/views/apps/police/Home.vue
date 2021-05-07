<template>
	<div class="row main">
		<div class="col-12">
			<div class="q-pa-sm">
				<q-card>
					<q-card-section class="bg-blue-9 text-white">
						<div class="text-h6 text-center">Announcements</div>
					</q-card-section>

					<q-tab-panels v-model="announcement" animated>
						<q-tab-panel v-for="announcement in announcements" :key="announcement.id" :name="announcement.id">
							{{announcement.description}}
						</q-tab-panel>
					</q-tab-panels>
					<q-separator/>
					<q-tabs align="left" v-model="announcement" class="text-blue">
						<q-tab v-for="announcement in announcements" :key="announcement.id" :label="announcement.header" :name="announcement.id"/>
					</q-tabs>
				</q-card>
			</div>
		</div>
		<div class="col-4">
			<div class="q-pa-sm">
				<q-card>
					<q-card-section class="bg-blue-9 text-white">
						<div class="text-center">Recent Warrants</div>
					</q-card-section>
					<q-separator/>
					<q-list>
						<q-item v-for="warrant in warrants" :key="warrant.id">
							<q-item-section>
								<q-item-label>{{warrant.name}}</q-item-label>
								<q-item-label caption lines="4">{{warrant.description}}</q-item-label>
							</q-item-section>
							<q-item-section side top>
								<q-item-label caption>{{formatDate(warrant.created_at)}}</q-item-label>
							</q-item-section>
							<q-separator spaced inset />
						</q-item>
					</q-list>
				</q-card>
			</div>
		</div>
		<div class="col-4">
			<div class="q-pa-sm">
				<q-card>
					<q-card-section class="bg-blue-9 text-white">
						<div class="text-center">Recent Bolos</div>
					</q-card-section>
					<q-separator/>
					<q-list>
						<q-item v-for="bolo in bolos" :key="bolo.id">
							<q-item-section>
								<q-item-label>{{bolo.name}}</q-item-label>
								<q-item-label caption lines="4">{{bolo.description}}</q-item-label>
							</q-item-section>
							<q-item-section side top>
								<q-item-label caption>{{formatDate(bolo.created_at)}}</q-item-label>
							</q-item-section>
							<q-separator spaced inset />
						</q-item>
					</q-list>
				</q-card>
			</div>
		</div>
		<div class="col-4">
			<div class="q-pa-sm">
				<q-card>
					<q-card-section class="bg-blue-9 text-white">
						<div class="text-center">Recent Reports</div>
					</q-card-section>
					<q-separator/>
					<q-list>
						<q-item v-for="report in reports" :key="report.id">
							<q-item-section>
								<q-item-label lines="1">{{report.file}}</q-item-label>
								<q-item-label caption lines="4">{{report.creator}}</q-item-label>
							</q-item-section>
							<q-separator spaced inset />
						</q-item>
					</q-list>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import { mapGetters } from 'vuex'
	export default {
		name: 'police.home',
		data: () => ({
			announcement: ref(1),
		}),
		computed: {
			...mapGetters(["appData"]),
			announcements() {
				let [err, announcements] = this.appData("announcements");

				if (err)
					return [];
				return announcements;
			},
			warrants() {
				let [err, warrants] = this.appData("warrants");

				if (err)
					return [];
				return warrants;
			},
			reports() {
				let [err, incidents] =  this.appData("reports");

				if (err)
					return [];
				return incidents;
			},
			bolos() {
				let [err, bolos] = this.appData("bolos");

				if (err)
					return [];
				return bolos;
			},
		},
		methods: {
			formatDate(ts) {
				return new Date(ts * 1000).toLocaleString('en-US', { timeZone: 'UTC', timeZoneName: 'short'});
			},
		},
	}
</script>

<style scoped>
	.main {
		background-color: rgb(255, 255, 255);
		width: 100%;
	}
</style>