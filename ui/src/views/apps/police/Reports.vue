<template>
	<div class="row">
		<div class="col-12 q-pa-md">
			<q-bar dense class="bg-grey-9 text-white">
				<div class="cursor-pointer non-selectable">
					File
					<q-menu>
						<q-list dense style="min-width: 100px">
							<q-item clickable>
								<q-item-section>New</q-item-section>
								<q-item-section side>
									<q-icon name="keyboard_arrow_right"/>
								</q-item-section>
								<q-menu anchor="top end" self="top start">
									<q-list>
										<q-item v-for="reportType in reportTypes" :key="reportType.id" dense clickable v-on:click="selectType(reportType.file, reportType.name)">
											<q-item-section>{{reportType.type}}</q-item-section>
										</q-item>
									</q-list>
								</q-menu>
							</q-item>
							<q-separator/>
							<q-item clickable v-close-popup>
								<q-item-section>Open</q-item-section>
							</q-item>
							<q-separator/>
							<q-item clickable v-close-popup>
								<q-item-section>Save</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</div>
			</q-bar>
			<q-card>
				<q-card-section>
					<q-table flat
						title="Reports"
						:rows="reports"
						:columns="columns"
						row-key="id"
						virtual-scroll
						v-model="pagination"
					>
					</q-table>
				</q-card-section>
			</q-card>
			<q-dialog v-model="dialogOpen">
				<q-layout container class="bg-white" style="height: 83%; width: 900px; max-width: 80vw;">
                    <q-header class="bg-primary">
                        <q-toolbar>
                            <q-toolbar-title>{{reportType}}</q-toolbar-title>
							<input type="file" id="file-picker"/>
                            <q-btn flat v-close-popup round dense icon="close" />
                            <q-btn id="file-saver" v-on:click="submitReport" flat rounded dense icon="save"/>
                        </q-toolbar>
                    </q-header>
                    <WebViewer :file="file" :name="name"/>
				</q-layout>
			</q-dialog>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
    // import { ref } from 'vue'
    import WebViewer from './components/WebViewer.vue'

	export default {
        name: "police.reports",
        components: {
            WebViewer
        },
		data: () => ({
            dialogOpen: false,
            file: "",
			name: "",
		}),
		computed: {
			...mapGetters(["appData"]),
			reportTypes() {
				return this.appData("reportTypes")[1]
			},
			reports() {
				return this.appData("reports")[1]
            },
		},
		methods: {
			selectType(file, name) {
                this.dialogOpen = true
                this.file = "templates/" + file
				if( name != null ) {
					this.name = name + "-" + Math.round(new Date().getTime()/1000)
				}
			},
			...mapMutations(["submitReport"]),
			submitReport() {
				console.log("Report Submitted " + this.name)
				this.submitReport({name: this.name})
				// Add sql sync
			}
		},
	}
</script>

<style lang="scss" scoped>
	.form-section {
		padding-bottom: 24px;
	}
</style>