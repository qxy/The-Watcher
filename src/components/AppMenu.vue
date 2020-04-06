<template>
	<q-menu square auto-close :offset="[12, 4]"
		transition-show="fade" transition-hide="fade">
		<q-list bordered class="text-subtitle1">
			<div v-for="(item, i) in items" :key="i">
				<q-separator v-if="i > 0" />
				<q-item clickable @click="item.method">
					<q-item-section avatar>
						<q-icon color="accent" :name="item.icon" />
					</q-item-section>
					<q-item-section class="q-pr-lg">
						<q-item-label>{{ item.label }}</q-item-label>
					</q-item-section>
				</q-item>
			</div>
			<q-separator />
			<q-item dense class="bg-grey-8 text-white text-caption">
				<q-item-section avatar>
					<q-icon name="cake" size="xs" />
				</q-item-section>
				<q-item-section class="q-pr-lg">
					<q-item-label>V {{ version }}</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-menu>
</template>

<script>
import { version } from '../../package.json'

export default {
	name: 'AppMenu',
	props: {
		items: {
			type: Array,
			required: true
		}
	},
	data: () => ({
		version
	})
}
</script>
