<template>
	<div class="row items-center q-pa-sm q-gutter-x-sm">
		<div class="col-auto">
			<q-checkbox
				color="secondary"
				dense size="sm"
				v-model="data.active"
				@input="$emit('save')"
			/>
		</div>
		<div class="col-auto">
			<q-btn
				flat round size="sm" icon="edit"
				:disable="!data.active"
				@click="$emit('edit')"
			/>
		</div>
		<div class="title-link col">
			<span :class="titleClass" @click="$emit('open-url')">
				{{ data.title }}
			</span>
		</div>
		<div class="col-auto">
			<show-number
				prefix="S"
				v-model="data.season"
				@input="$emit('save')"
				:disable="!data.active"
			/>
		</div>
		<div class="col-auto">
			<show-number
				prefix="E"
				v-model="data.episode"
				@input="$emit('save')"
				:disable="!data.active"
			/>
		</div>
	</div>
</template>

<script>
import ShowNumber from 'components/ShowNumber'

export default {
	name: 'ShowEntry',
	components: { ShowNumber },
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	computed: {
		titleClass() {
			return !this.data.active
				? 'text-grey cursor-not-allowed'
				: 'text-black cursor-pointer text-link'
		}
	}
}
</script>

<style>
	.title-link span.text-link:hover {
		text-decoration: underline
	}
</style>
