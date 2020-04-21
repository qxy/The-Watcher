<template>
	<div class="column q-pa-sm">
		<q-card class="bg-grey-1">
			<q-banner v-if="!sList.length"
				dense class="bg-grey-2 shadow-1">
				<template v-slot:avatar>
					<q-icon name="info" color="primary" />
				</template>
				<span>List is empty.</span>
			</q-banner>
			<div v-for="(data, id) in sList" :key="id" class="show-entry">
				<q-separator />
				<show-entry
					:data="data"
					@edit="editData(id)"
					@save="saveData"
					@open-url="openURL(data)"
				/>
			</div>
		</q-card>
		<q-btn v-if="!!sList.length" @click="openAll"
			dense class="q-mt-sm full-width" color="primary">
			<q-icon left name="visibility" />
			<span>Look around</span>
		</q-btn>
	</div>
</template>

<script>
import store from 'src/store'
import format from 'src/format'
import ShowEntry from 'components/ShowEntry'

export default {
	name: 'ShowList',
	components: { ShowEntry },
	data: () => ({
		sList: store.state.showList
	}),
	methods: {
		editData(id) {
			this.$router.replace(`edit/${id}`)
		},
		saveData() {
			store.saveData()
		},
		openURL(data) {
			if (!data.active) return
			const fURL = format.url(data)
			const eURL = encodeURI(fURL)
			const shell = require('electron').shell
			shell.openExternal(eURL)
			// console.log(eURL)
		},
		async openAll() {
			const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
			const loading = (this.sList.filter(data => data.active).length > 2)

			if (loading) this.$q.loading.show()
			for (const data of this.sList) {
				if (data.active) {
					this.openURL(data)
					await sleep(200)
				}
			}
			this.$q.loading.hide()
		}
	},
	beforeCreate() {
		store.loadData()
	}
}
</script>

<style>
	.show-entry {
		transition: background 0.75s;
		background: rgb(250, 250, 250)
	}

	.show-entry:hover {
		transition: background 0.25s;
		background: rgb(240, 240, 240)
	}
</style>
