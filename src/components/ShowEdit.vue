<template>
	<q-card class="show-edit column bg-grey-1">
		<q-form @submit="editSave">
			<q-card-section class="row q-gutter-y-sm justify-between">
				<q-input class="col-12"
					autofocus
					dense outlined
					label="Title"
					type="text"
					v-model.trim="data.title"
					:rules="[validate.required]"
				/>
				<q-input class="col-5"
					dense outlined
					label="Season"
					type="number" min="1" max="99"
					v-model="data.season"
					:rules="[validate.required, validate.number]"
				/>
				<q-input class="col-5"
					dense outlined
					label="Episode"
					type="number" min="1" max="99"
					v-model="data.episode"
					:rules="[validate.required, validate.number]"
				/>
				<q-input class="col-12"
					dense outlined
					label="URL"
					type="url"
					:hint="formatURL"
					v-model.trim="data.url"
					:rules="[validate.required, validate.url]">
					<template v-slot:append>
						<q-btn @click="showHelp = !showHelp"
							round dense flat color="primary" icon="help"
						/>
					</template>
				</q-input>
				<q-slide-transition :duration="100">
					<q-banner v-if="showHelp"
						dense class="col-12 q-mt-sm bg-grey-4 shadow-1">
						<div class="row text-caption">
							<div class="col-3"><b>{T} {t}</b></div>
							<div class="col-9">Title Case Unchanged / title lowercase; spaces unchanged (url encoded)</div>
							<div class="col-3"><b>{T+} {t+}</b></div>
							<div class="col-9">Title Case Unchanged / title lowercase; spaces replaced with <b>+</b> signs</div>
							<div class="col-3"><b>{S##} {s##}</b></div>
							<div class="col-9">current Season number (with corresponding case)</div>
							<div class="col-3"><b>{E##} {e##}</b></div>
							<div class="col-9">current Episode number (with corresponding case)</div>
						</div>
					</q-banner>
				</q-slide-transition>
			</q-card-section>
			<q-separator />
			<q-card-actions class="q-pa-md justify-between">
				<div>
					<q-btn-group v-if="!confirm">
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
					<q-banner v-else
						dense class="q-mt-none q-py-xs bg-negative text-white shadow-1">
						<template v-slot:avatar>
							<q-icon name="warning" color="white" />
						</template>
						<span>Click again to confirm delete!</span>
					</q-banner>
				</div>
				<q-btn glossy
					:disabled="id == -1"
					icon="delete"
					color="negative"
					label="delete"
					@click="editDelete"
				/>
			</q-card-actions>
		</q-form>
	</q-card>
</template>

<script>
import format from 'src/format'

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
		confirm: null,
		showHelp: false
	}),
	computed: {
		formatURL() {
			return (!this.data || !this.data.url.length)
				? 'http(s)://example.url/{t+}/{s##}{e##}'
				: format.url(this.data)
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
