<template>
	<div class="show-number row q-gutter-x-xs">
		<div class="col-auto">
			<q-badge :color="color" :label="label" />
		</div>
		<div class="col-auto">
			<q-btn
				outline size="xs"
				:color="color" icon="remove"
				:disabled="disable || value == 1"
				@click="$emit('input', value - 1)"
			/>
		</div>
		<div class="col-auto">
			<q-btn
				outline size="xs"
				:color="color" icon="add"
				:disabled="disable || value == 99"
				@click="$emit('input', value + 1)"
			/>
		</div>
	</div>
</template>

<script>
import format from 'src/format'

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
		color() {
			return (this.disable ? 'grey' : 'primary')
		},
		label() {
			return `${this.prefix}${format.number(this.value)}`
		}
	}
}
</script>

<style>
	.show-number .q-btn__wrapper {
		padding: 0 2px !important
	}
</style>
