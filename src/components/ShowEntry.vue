<template>
	<div class="row items-center q-pa-sm q-gutter-x-sm">
		<div class="col-auto">
			<q-checkbox
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
		<div class="title-link col cursor-pointer">
			<div @click="openURL" :class="titleClass">
				<span>{{ data.title }}</span>
			</div>
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
import format from 'src/format'

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
				: 'text-black cursor-pointer'
		}
	},
	methods: {
		openURL() {
			if (!this.data.active) return
			const fURL = format.url(this.data)
			const eURL = encodeURI(fURL)
			const shell = require('electron').shell
			shell.openExternal(eURL)
			// console.log(eURL)
		}
	}
}
</script>

<style>
	.title-link span:hover {
		text-decoration: underline
	}
</style>
