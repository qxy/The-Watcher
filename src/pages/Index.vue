<template>
	<q-page class="flex">
		<show-list v-if="!sEdit"
			:entries="sList"
			@add-new="addNew"
			@edit="edit"
			@save="saveData"
		/>
		<show-edit v-else
			:id="editId"
			:data="sEdit"
			@edit-save="editSave"
			@edit-cancel="editCancel"
			@edit-delete="editDelete"
		/>
	</q-page>
</template>

<script>
import ShowList from 'components/ShowList'
import ShowEdit from 'components/ShowEdit'

export default {
	name: 'PageIndex',
	components: { ShowList, ShowEdit },
	data: () => ({
		sList: [],
		editId: -1,
		sEdit: null
	}),
	methods: {
		addNew() {
			this.editId = -1
			this.sEdit = {
				active: true,
				name: '',
				season: 1,
				episode: 1,
				url: ''
			}
		},
		edit(id) {
			this.editId = id
			this.sEdit = { ...this.sList[id] }
		},
		editSave() {
			if (!this.sEdit) return
			this.sEdit.season = this.sEdit.season * 1
			this.sEdit.episode = this.sEdit.episode * 1
			// add new
			if (this.editId == -1) {
				this.sList.push(this.sEdit)
			}
			// update
			else {
				this.sList[this.editId] = this.sEdit
			}
			this.saveData()
			this.editCancel()
		},
		editCancel() {
			this.editId = -1
			this.sEdit = null
		},
		editDelete() {
			if (this.editId == -1) return
			this.sList.splice(this.editId, 1)
			this.saveData()
			this.editCancel()
		},
		saveData() {
			const list = JSON.stringify(this.sList)
			window.localStorage.setItem('list', list)
			console.log('Data saved!')
		}
	},
	beforeMount() {
		const list = JSON.parse(window.localStorage.getItem('list'))
		this.sList = list || []
	}
}
</script>
