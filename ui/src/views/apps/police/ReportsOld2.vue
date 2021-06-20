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
										<q-item v-for="reportType in reportTypes" :key="reportType.id" dense clickable v-on:click="selectType(reportType.id)">
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
				<q-layout container class="bg-white" style="height: 73%; width: 700px; max-width: 80vw;">
					<div>
						<q-header class="bg-primary">
							<q-toolbar>
								<q-toolbar-title v-if="reportType === 0">INCIDENT REPORT</q-toolbar-title>
								<q-toolbar-title v-if="reportType === 1">ARREST REPORT</q-toolbar-title>
								<q-toolbar-title v-if="reportType === 2">WARRANT</q-toolbar-title>
								<q-toolbar-title v-if="reportType === 3">IA REPORT</q-toolbar-title>
								<q-btn flat v-close-popup round dense icon="close" />
							</q-toolbar>
						</q-header>
						<q-page-container>
							<q-form class="q-pa-sm">
								<div class="form-section" v-for="(section, index) in forms.reports[reportType]" :key="index">
									<q-bar class="bg-grey-2">
										<q-toolbar>
											<q-toolbar-title>{{section.Title}}</q-toolbar-title>
											<q-btn flat round dense icon="add" v-if="section.Buttons" v-on:click="section.Add(index)"/>
											<q-btn flat round dense icon="remove" v-if="section.Buttons" v-on:click="section.Remove(index)"/>
										</q-toolbar>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row" v-for="row in section.Data" :key="row">
											<div v-for="column in row" :key="column" v-bind:class="column.Class">
												<q-input outlined square :key="column.label" v-model="column.Value" :label="column.Label" :type="column.Type || ''" stack-label v-if="column.Timestamp === false"/>
												<q-input v-else outlined square stack-label :dense="dense" v-model="column.Value">
													<template v-slot:prepend>
														<q-icon name="event" class="cursor-pointer">
														<q-popup-proxy transition-show="scale" transition-hide="scale">
															<q-date v-model="column.Value" mask="YYYY-MM-DD HH:mm">
															<div class="row items-center justify-end">
																<q-btn v-close-popup label="Close" color="primary" flat />
															</div>
															</q-date>
														</q-popup-proxy>
														</q-icon>
													</template>
													<template v-slot:append>
														<q-icon name="access_time" class="cursor-pointer">
														<q-popup-proxy transition-show="scale" transition-hide="scale">
															<q-time v-model="column.Value" mask="YYYY-MM-DD HH:mm" format24h>
															<div class="row items-center justify-end">
																<q-btn v-close-popup label="Close" color="primary" flat />
															</div>
															</q-time>
														</q-popup-proxy>
														</q-icon>
													</template>
												</q-input>
											</div>
										</div>
									</q-card>
								</div>
							</q-form>
						</q-page-container>
					</div>
					
				</q-layout>
			</q-dialog>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { ref } from 'vue'
	let columns = [
		{
			name: 'id',
			label: 'id',
			field: 'id',
			required: true,
			align: 'left',
		},
		{
			name: 'file',
			required: true,
			field: 'file',
			align: 'left',
			label: 'File'
		},
		{
			name: 'creator',
			required: true,
			field: 'creator',
			align: 'left',
			label: 'Creator'
		},
		{
			name: 'timestamp',
			required: true,
			field: 'timestamp',
			align: 'left',
			label: 'Timestamp'
		}
	]

	export default {
		name: "police.reports",
		methods: {
			selectType(type) {
				this.reportType = type
				this.dialogOpen = true
			},
		},
		created: () => ({
			setPerson(index, number) {
				if(number === 1) {
					this.forms.reports[0][index].push([
						{ Value: ref(''), Label: "Last Name", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "First Name", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "DOB", Class: "col-2", Timestamp: false},
						{ Value: ref(''), Label: "Race", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Sex", Class: "col-2", Timestamp: false},
					],
					[
						{ Value: ref(''), Label: "Ethnicity", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Resident", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Eye Color", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Hair Color", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Age", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Height", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Weight", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Cell Phone", Class: "col", Timestamp: false},
					],
					[
						{ Value: ref(''), Label: "Street", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "City", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "State", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Zip Code", Class: "col", Timestamp: false},
					])
				} else {
					this.forms.reports[0][index].splice(this.forms.reports[0][1].length - 3, 3)
				}
			},
			setProperty(index, number) {
				if(number === 1) {
					this.forms.reports[0][2].push([
						{ Value: ref(''), Label: "Item", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Quantity", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Brand", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Model", Class: "col", Timestamp: false},
					],
					[
						{ Value: ref(''), Label: "Address/License", Class: "col-6", Timestamp: false},
						{ Value: ref(''), Label: "Color", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Market Value", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Damages Value", Class: "col", Timestamp: false},
					],
					[
						{ Value: ref(''), Label: "Description", Class: "col-12 autogrow", Type: "textarea", Timestamp: false},
					])
				} else {
					this.forms.reports[0][2].splice(this.forms.reports[0][2].length - 3, 3)
				}
			},
			setDrugs(number) {
				if(number === 1) {
					this.forms.reports[1][2].push([
						{ Value: ref(''), Label: "Status", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Quantity", Class: "col", Timestamp: false},
						{ Value: ref(''), Label: "Suspected Type", Class: "col", Timestamp: false},
					])
				} else {
					this.forms.reports[1][2].splice(this.forms.reports[1][2].length - 1, 1)
				}
			}
		}),
		data: () => ({
			reportType: 0,
			dialogOpen: false,
			columns,
			pagination: ref({
				rowsPerPage: 50
			}),
			forms: {
				reports: [
					[
						{
							Title: "Incident Information", 
							Buttons: false,
							Data: [
								[
									{ Value: ref(''), Label: "Name", Class: "col", Timestamp: false},
									{ Value: ref(''), Label: "Timestamp", Class: "col", Timestamp: true},
									{ Value: ref(''), Label: "Location of Incident", Class: "col", Timestamp: false},
								],
								[
									{ Value: ref(''), Label: "Filed By", Class: "col", Timestamp: false},
									{ Value: ref(''), Label: "Location of Filing", Class: "col", Timestamp: false},
									{ Value: ref(''), Label: "Approved By", Class: "col", Timestamp: false},
								],
							],
						},
						{
							Title: "Persons Listings", 
							Buttons: true,
							Add: function(index) {
								this.setPerson(index, 1)
							},
							Remove: function(index) {
								this.setPerson(index, -1)
							},
							Data: [],
						},
						{
							Title: "Properties Listings", 
							Buttons: true,
							Data: [],
						},
						{
							Title: "Narrative", 
							Buttons: false,
							Data: [
								{ Value: ref(''), Label: "Narrative", Class: "col-12", Type: "textarea", Timestamp: false},
							]
						}
					],
					[
						[
							[
								{ Value: ref(''), Label: "Agency Name", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Date/Time Arrested", Class: "col", Timestamp: true},
							]
						],
						[
							[
								{ Value: ref(''), Label: "Name", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "DOB", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Age", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Race", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Sex", Class: "col", Timestamp: false},
							],
							[
								{ Value: ref(''), Label: "Current Address", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Phone", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Occupation", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Nationality", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Scars, Marks, Tattoos", Class: "col", Timestamp: false},
							],
							[
								{ Value: ref(''), Label: "Employer", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Employer Address", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Employer Phone Number", Class: "col", Timestamp: false},
							],
							[
								{ Value: ref(''), Label: "Also Known As (Alias Names)", Class: "col-6", Timestamp: false},
								{ Value: ref(''), Label: "Height", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Weight", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Hair", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Eyes", Class: "col", Timestamp: false},
								{ Value: ref(''), Label: "Skin", Class: "col", Timestamp: false},
							],
						],
						[
							[],
						],
						[
							[
								{ Value: ref(''), Label: "Narrative", Class: "col", Type:"textarea", Timestamp: false},
							],
						],
					],
				]
			}
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
	}
</script>

<style lang="scss" scoped>
	.form-section {
		padding-bottom: 24px;
	}
</style>