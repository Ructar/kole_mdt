<template>
	<div id="webviewer" ref="viewer"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import WebViewer from '@pdftron/webviewer';
// import { mapMutations } from 'vuex'

export default {
	name: 'WebViewer',
	props: { file: { type: String }, name: { type: String } },
	setup(props) {
		const viewer = ref(null);
		onMounted(() => {
			const path = `${process.env.BASE_URL}webviewer`;
			WebViewer({ path }, viewer.value).then((instance) => {
				if ( props.file ) {
					const url = 'http://localhost:8081/documents/' + props.file;
					instance.loadDocument(url);
				}
				const { docViewer, annotManager } = instance;
				document.getElementById('file-picker').addEventListener('change', () => {
					const file = document.getElementById('file-picker').files[0];
					instance.loadDocument(file, { filename: file.name });
				});
				docViewer.on('documentLoaded', async () => {
					document.getElementById('file-saver').addEventListener('click', async () => {
						const doc = docViewer.getDocument();
						const xfdfString = await annotManager.exportAnnotations();
						const data = await doc.getFileData({
							xfdfString
						});
						const arr = new Uint8Array(data);
						const blob = new Blob([arr], { type: 'application/pdf' });
						console.log(blob)

						const dataForm = new FormData();
						dataForm.append("report", blob, props.name + ".pdf")

						let req = new XMLHttpRequest()
						req.open("POST", "http://localhost:8081/documents", true);
						req.onload = function (oEvent) {
							console.log("Uploaded File " + oEvent)
						};
						// req.onreadystatechange = function() {
						// 	if ( this.status == 200 ) {
						// 		console.log(this.responseText)
						// 	}
						// }
						req.send(dataForm, props.name + ".pdf")
					})
				})
			});
		});

		return {
			viewer,
		};
	},
};
</script>

<style>
#webviewer {
	height: 800px;
}
</style>
