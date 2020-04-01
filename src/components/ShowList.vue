<template>
	<div class="col q-pa-md">
		<!-- ADD NEW BUTTON -->
		<q-btn
			outline rounded
			icon="add_circle" color="primary" label="Add new"
			@click="$emit('add-new')"
		/>
		<q-card class="q-mt-md bg-grey-1">
			<q-banner dense class="bg-grey-2 shadow-1" v-if="!entries.length">
				<template v-slot:avatar>
					<q-icon name="info" color="primary" />
				</template>
				<span>List is empty.</span>
			</q-banner>
			<div v-for="(e, i) in entries" :key="i">
				<q-separator v-if="i > 0" />
				<show-entry
					:data="e"
					@edit="$emit('edit', i)"
					@save="$emit('save')"
				/>
			</div>
		</q-card>
	</div>
</template>

<script>
import ShowEntry from 'components/ShowEntry'

export default {
	name: 'ShowList',
	components: { ShowEntry },
	props: {
		entries: {
			type: Array,
			requred: true
		}
	}
}
</script>
