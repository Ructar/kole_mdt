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
					<div v-if="reportType === 1">
						<q-header class="bg-primary">
							<q-toolbar>
								<q-toolbar-title>Incident Report</q-toolbar-title>
								<q-btn flat v-close-popup round dense icon="close" />
							</q-toolbar>
						</q-header>
						<q-page-container>
							<q-form class="q-pa-sm">
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">INCIDENT INFORMATION</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row">
											<div class="col">
												<q-input outlined square v-model="forms.incident.name" label="Name(Affected Individual)" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square stack-label :dense="dense" v-model="forms.incident.date">
													<template v-slot:prepend>
														<q-icon name="event" class="cursor-pointer">
														<q-popup-proxy transition-show="scale" transition-hide="scale">
															<q-date v-model="forms.incident.date" mask="YYYY-MM-DD HH:mm">
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
															<q-time v-model="forms.incident.date" mask="YYYY-MM-DD HH:mm" format24h>
															<div class="row items-center justify-end">
																<q-btn v-close-popup label="Close" color="primary" flat />
															</div>
															</q-time>
														</q-popup-proxy>
														</q-icon>
													</template>
												</q-input>
											</div>
											<div class="col">
												<q-input outlined square v-model="forms.incident.location" label="Location" stack-label/>
											</div>
										</div>
										<div class="row">
											<div class="col">
												<q-input outlined square v-model="forms.incident.filedby" label="Report Filed From" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="forms.incident.occurance" label="Location of Occurrence" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="forms.incident.locationtype" label="Location Type" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="forms.incident.approvedby" label="Approved By" stack-label/>
											</div>
										</div>
									</q-card>
								</div>
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">PERSON LISTINGS</div>
										<q-btn flat round dense icon="add" v-on:click="setPersons(1)"/>
										<q-btn flat round dense icon="remove" v-on:click="setPersons(-1)"/>
									</q-bar>
									<q-card class="q-pa-sm" v-for="(person, index) in forms.incident.persons" :key="index">
										<div class="row">
											<div class="col">
												<q-input outlined square v-model="person.lastname" label="Last Name" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.firstname" label="First Name" stack-label/>
											</div>
											<div class="col-2">
												<q-input outlined square v-model="person.dob" label="DOB" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.race" label="race" stack-label/>
											</div>
											<div class="col-2">
												<q-input outlined square v-model="person.sex" label="sex" stack-label/>
											</div>
										</div>
										<div class="row">
											<div class="col">
												<q-input outlined square v-model="person.ethnicity" label="Ethnicity" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.resident" label="Resident" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.eyecolor" label="Eye Color" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.haircolor" label="Hair Color" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.age" label="Age" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.height" label="Height" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.weight" label="Weight" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.cellphone" label="Cell Phone" stack-label/>
											</div>
										</div>
										<div class="row">
											<div class="col">
												<q-input outlined square v-model="person.street" label="Street" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.city" label="City" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.state" label="State" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="person.zip" label="Zip Code" stack-label/>
											</div>
										</div>
									</q-card>
								</div>
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">PROPERTIES</div>
										<q-btn flat round dense icon="add" v-on:click="setProperties(1)"/>
										<q-btn flat round dense icon="remove" v-on:click="setProperties(-1)"/>
									</q-bar>
									<q-card class="q-pa-sm" v-for="(property, index) in forms.incident.properties" :key="index">
										<div class="row">
											<div class="col-4">
												<q-input outlined square v-model="property.item" label="Item" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="property.quantity" label="Quantity" stack-label/>
											</div>
											<div class="col-4">
												<q-input outlined square v-model="property.brand" label="Brand" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="property.model" label="Model" stack-label/>
											</div>
										</div>
										<div class="row">
											<div class="col">
												<q-input outlined square v-model="property.address" label="Address Or License Plate" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="property.color" label="Color" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="property.value" label="Market Value" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square v-model="property.damage" label="Damages Value" stack-label/>
											</div>
										</div>
										<div class="row">
											<div class="col-12">
												<q-input outlined square v-model="property.description" type="textarea" label="Description" stack-label autogrow/>
											</div>
										</div>
									</q-card>
								</div>
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">NARRATIVE</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<q-input outlined square v-model="forms.incident.narrative" type="textarea" autogrow/>
									</q-card>
								</div>
								<q-btn align="float-right" label="Submit">
								</q-btn>
							</q-form>
						</q-page-container>
					</div>
					<div v-if="reportType === 2">
						<q-header class="bg-primary">
							<q-toolbar>
								<q-toolbar-title>ARREST REPORT</q-toolbar-title>
								<q-btn flat v-close-popup round dense icon="close" />
							</q-toolbar>
						</q-header>
						<q-page-container>
							<q-form class="q-pa-sm">
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">AGENCY INFO</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row">
											<div class="col">
												<q-input outlined square label="Agency Name" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square stack-label label="Date/Time Arrested" :dense="dense" v-model="forms.incident.date">
													<template v-slot:prepend>
														<q-icon name="event" class="cursor-pointer">
														<q-popup-proxy transition-show="scale" transition-hide="scale">
															<q-date v-model="forms.incident.date" mask="YYYY-MM-DD HH:mm">
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
															<q-time v-model="forms.incident.date" mask="YYYY-MM-DD HH:mm" format24h>
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
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">ARRESTEE INFO</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row">
											<div class="col-4">
												<q-input outlined square label="Name (Last, First, Middle)" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square label="D.O.B" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square label="Age" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square label="Race" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square label="Sex" stack-label/>
											</div>
										</div>
										<div class="row">
											<div class="col-4">
												<q-input outlined square label="Current Address" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square label="Phone" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square label="Occupation" stack-label/>
											</div>
											<div class="col">
												<q-input outlined square label="Race" stack-label/>
											</div>
											<div class="col">
												<q-option-group
												:options="options"
												type="checkbox"
												v-model="group"
												/>
											</div>
										</div>
									</q-card>
								</div>
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">ARREST INFO</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row">
											<div class="col">
												
											</div>
										</div>
									</q-card>
								</div>
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">VEHICLE INFO</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row">
											<div class="col">
												
											</div>
										</div>
									</q-card>
								</div>
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">CONFINED BOND</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row">
											<div class="col">
												
											</div>
										</div>
									</q-card>
								</div>
								<div class="form-section">
									<q-bar class="bg-grey-2">
										<div class="text-left text-bold">NARRATIVE</div>
									</q-bar>
									<q-card class="q-pa-sm">
										<div class="row">
											<div class="col">
												
											</div>
										</div>
									</q-card>
								</div>
							</q-form>
						</q-page-container>
					</div>
					<div v-if="reportType === 3">
						<q-header class="bg-primary">
							<q-toolbar>
								<q-toolbar-title>{{reportType}}</q-toolbar-title>
								<q-btn flat v-close-popup round dense icon="close" />
							</q-toolbar>
						</q-header>
					</div>
					<div v-if="reportType === 4">
						<q-header class="bg-primary">
							<q-toolbar>
								<q-toolbar-title>{{reportType}}</q-toolbar-title>
								<q-btn flat v-close-popup round dense icon="close" />
							</q-toolbar>
						</q-header>
					</div>
					<div v-if="reportType === 5">
						<q-header class="bg-primary">
							<q-toolbar>
								<q-toolbar-title>{{reportType}}</q-toolbar-title>
								<q-btn flat v-close-popup round dense icon="close" />
							</q-toolbar>
						</q-header>
					</div>
				</q-layout>
			</q-dialog>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
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
		data: () => ({
			reportType: 0,
			dialogOpen: false,
			columns,
			pagination: ref({
				rowsPerPage: 50
			}),
			forms: {
				incident: {
					date: ref('xxxx-xx-xx xx:xx'),
					name: ref(''),
					location: ref(''),
					narrative: ref(''),
					approvedby: ref(''),
					locationtype: ref(''),
					occurance: ref(''),
					filedby: ref(''),
					persons: [],
					properties: []
				},
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
		methods: {
			selectType(type) {
				this.reportType = type
				this.dialogOpen = true
			},
			setPersons(number) {
				if(number === 1){
					this.forms.incident.persons.push({
						firstname: ref(''),
						lastname: ref(''),
						dob: ref(''),
						race: ref(''),
						sex: ref(''),
						ethnicity: ref(''),
						resident: ref(''),
						eyecolor: ref(''),
						haircolor: ref(''),
						age: ref(''),
						height: ref(''),
						weight: ref(''),
						cellphone: ref(''),
						street: ref(''),
						city: ref(''),
						state: ref(''),
						zip: ref(''),
					})
				} else {
					this.forms.incident.persons.pop()
				}
			},
			setProperties(number) {
				if(number === 1){
					this.forms.incident.properties.push({
						item: ref(''),
						quantity: ref(''),
						brand: ref(''),
						model: ref(''),
						address: ref(''),
						color: ref(''),
						value: ref(''),
						damage: ref(''),
						description: ref(''),
					})
				} else {
					this.forms.incident.properties.pop()
				}
			}
		},
		mutations: {
			...mapMutations("submitReport"),
			submitReport(type) {
				if(type === 1) {
					this.submitReport(this.forms.incident)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-section {
		padding-bottom: 24px;
	}
</style>