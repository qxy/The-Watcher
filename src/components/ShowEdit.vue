<template>
	<q-card class="show-edit col q-ma-md bg-grey-1">
		<q-form @submit="editSave">
			<q-card-section class="row q-gutter-y-sm justify-between">
				<q-input class="col-12"
					outlined clearable
					label="Title"
					v-model="data.title"
					:rules="[validate.required]"
				/>
				<q-input class="col-5"
					outlined
					label="Season"
					type="number" min="1" max="99"
					v-model="data.season"
					:rules="[validate.required, validate.number]"
				/>
				<q-input class="col-5"
					outlined
					label="Episode"
					type="number" min="1" max="99"
					v-model="data.episode"
					:rules="[validate.required, validate.number]"
				/>
				<q-input class="col-12"
					outlined clearable
					label="URL"
					type="url"
					hint=""
					v-model="data.url"
					:rules="[validate.required, validate.url]"
				/>
				<q-banner dense class="q-mt-sm bg-grey-2 shadow-1">
					<template v-slot:avatar>
        				<q-icon name="info" color="primary" />
					</template>
					<div class="text-caption">
						<p>use <b>{S##}</b> and <b>{E##}</b> to insert current season/episode</p>
						<p>for example: <b>http://url.to/{S##}/{E##}</b> will be converted to <b>{{ exampleURL }}</b></p>
					</div>
				</q-banner>
			</q-card-section>
			<q-separator />
			<q-card-actions class="q-pa-md justify-between">
				<q-btn-group>
					<q-btn glossy
						type="submit"
						icon="save"
						color="positive"
						label="save"
					/>
					<q-btn glossy
						icon="cancel"
						color="warning"
						label="cancel"
						@click="editCancel"
					/>
				</q-btn-group>
				<q-btn glossy
					:disabled="id == -1"
					icon="delete"
					color="negative"
					label="delete"
					@click="editDelete"
				/>
			</q-card-actions>
			<q-card-section>
				<q-banner v-if="!!confirm"
					dense class="q-mt-none bg-grey-2 text-negative shadow-1">
					<template v-slot:avatar>
        				<q-icon name="warning" color="negative" />
					</template>
					<span>Click again to confirm delete!</span>
				</q-banner>
			</q-card-section>
		</q-form>
	</q-card>
</template>

<script>
import { format } from 'quasar'
const { pad } = format

export default {
	name: 'ShowEdit',
	props: {
		id: {
			type: Number,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		validate: {
			required: val => !!val || 'Field is required',
			number: val => (val > 0 && val < 100) || 'Must be between 1 & 99',
			url: val => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.{}\#]+$/gm.test(val) || 'Should match an URL'
		},
		confirm: null
	}),
	computed: {
		exampleURL() {
			return `http://url.to/S${pad(this.data.season, 2)}/E${pad(this.data.episode, 2)}`
		}
	},
	methods: {
		editSave() {
			this.$emit('edit-save')
		},
		editCancel() {
			this.$emit('edit-cancel')
		},
		editDelete() {
			if (!this.confirm) {
				this.confirm = setTimeout(() => {
					this.confirm = null
				}, 1000)
			}
			else {
				clearTimeout(this.confirm)
				this.$emit('edit-delete')
			}
		}
	}
}
</script>

<style>
	.show-edit .q-banner p {
		margin: 0 0 5px 0 !important
	}
</style>
