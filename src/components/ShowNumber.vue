<template>
	<div class="show-number row q-gutter-x-none items-center">
		<div class="col-auto">
			<q-chip dense square
				:color="color" text-color="white">
				{{ label }}
			</q-chip>
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
			<q-btn class="q-ml-xs"
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
			return (this.disable ? 'grey' : 'secondary')
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
