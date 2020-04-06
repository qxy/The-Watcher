<template>
	<div class="column q-pa-sm">
		<!-- ADD NEW BUTTON -->
		<q-btn class="full-width"
			outline rounded
			icon="add_circle" color="primary" label="Add new"
			to="edit/new"
		/>
		<q-card class="q-mt-sm bg-grey-1">
			<q-banner dense class="bg-grey-2 shadow-1" v-if="!sList.length">
				<template v-slot:avatar>
					<q-icon name="info" color="primary" />
				</template>
				<span>List is empty.</span>
			</q-banner>
			<div v-for="(data, id) in sList" :key="id">
				<q-separator v-if="id > 0" />
				<show-entry :data="data" @edit="editData(id)" @save="saveData" />
			</div>
		</q-card>
	</div>
</template>

<script>
import store from 'src/store'
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
		}
	},
	beforeCreate() {
		store.loadData()
	}
}
</script>
