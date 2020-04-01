<template>
	<div class="show-number row q-gutter-x-xs">
		<div class="col-auto">
			<q-badge
				:color="disable ? 'grey' : 'primary'"
				:label="label"
			/>
		</div>
		<div class="col-auto">
			<q-btn
				 outline size="xs"
				color="primary" icon="remove"
				:disabled="disable || value == 1"
				@click="$emit('input', value - 1)"
			/>
		</div>
		<div class="col-auto">
			<q-btn
				 outline size="xs"
				color="primary" icon="add"
				:disabled="disable || value == 99"
				@click="$emit('input', value + 1)"
			/>
		</div>
	</div>
</template>

<script>
import { format } from 'quasar'
const { pad } = format

export default {
	name: 'ShowNumber',
	props: {
		disable: {
			type: Boolean,
			required: true
		},
		prefix: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	},
	computed: {
		label() {
			return `${this.prefix}${pad(this.value, 2)}`
		}
	}
}
</script>

<style>
	.show-number .q-btn__wrapper {
		padding: 0 2px !important
	}
</style>
