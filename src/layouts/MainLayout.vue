<template>
	<q-layout view="hHh lpr fFf">
		<q-header elevated>
			<q-bar class="q-electron-drag">
				<q-btn dense flat icon="menu" :disable="!menuEnable">
					<app-menu :items="menuItems" />
				</q-btn>
				<div class="col text-center text-overline">The Watcher</div>
				<q-space />
				<q-btn dense flat icon="minimize" @click="minimize" />
				<q-btn
					dense flat @click="toggleAoT"
					:icon="iconAoT">
					<q-tooltip :delay="500">
						<span class="text-no-wrap">Always on top</span>
					</q-tooltip>
				</q-btn>
				<q-btn dense flat icon="close" @click="closeApp" />
			</q-bar>
		</q-header>

		<q-page-container>
			<!-- ERROR MESSAGE -->
			<q-slide-transition :duration="100">
				<q-banner v-if="!!errorMsg"
					dense class="bg-negative text-white shadow-1">
					<template v-slot:avatar>
						<q-icon name="error" color="white" />
					</template>
					<span>{{ errorMsg }}</span>
				</q-banner>
			</q-slide-transition>
			<!-- PAGE CONTENT -->
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</q-page-container>
	</q-layout>
</template>

<script>
import AppMenu from 'components/AppMenu'
const { dialog } = require('electron').remote
import store from 'src/store'

export default {
	name: 'DefaultLayout',
	components: { AppMenu },
	data: () => ({
		bWindow: null,
		alwaysOnTop: false,
		menuItems: [],
		fileFilter: [
			{ name: 'JSON', extensions: ['json'] }
		],
		errorMsg: false
	}),
	watch: {
		errorMsg(newVal) {
			if (!!newVal) {
				setTimeout(() => this.errorMsg = false, 5000)
			}
		}
	},
	computed: {
		menuEnable() {
			return (this.$route.name == 'ShowList')
		},
		iconAoT() {
			return (this.alwaysOnTop ? 'radio_button_checked' : 'radio_button_unchecked')
		}
	},
	methods: {
		// menu actions
		editNew() {
			this.$router.replace('edit/new')
		},
		importList() {
			const options = {
				buttonLabel: 'Import',
				properties: ['openFile'],
				filters: this.fileFilter
			}
			dialog.showOpenDialog(this.bWindow, options)
				.then(result => {
					if (result.canceled || !result.filePaths.length) return

					const fileName = result.filePaths[0]
					this.errorMsg = store.importList(fileName)
				}).catch(err => {
					this.errorMsg = err
				})
		},
		exportList() {
			const options = {
				buttonLabel: 'Export',
				properties: ['createDirectory'],
				filters: this.fileFilter
			}
			dialog.showSaveDialog(this.bWindow, options)
				.then(result => {
					if (result.canceled || !result.filePath) return

					const fileName = result.filePath
					this.errorMsg = store.exportList(fileName)
				}).catch(err => {
					this.errorMsg = err
				})
		},
		// window control
		minimize() {
			if (process.env.MODE === 'electron') {
				this.bWindow.minimize()
			}
		},
		toggleAoT() {
			if (process.env.MODE === 'electron') {
				this.alwaysOnTop = !this.bWindow.isAlwaysOnTop()
				this.bWindow.setAlwaysOnTop(this.alwaysOnTop)

				const waot = JSON.stringify({ state: this.alwaysOnTop })
				window.localStorage.setItem('waot', waot)
			}
		},
		closeApp() {
			if (process.env.MODE === 'electron') {
				this.bWindow.close()
			}
		}
	},
	beforeMount() {
		if (process.env.MODE === 'electron') {
			this.bWindow = this.$q.electron.remote.BrowserWindow.getAllWindows()[0]
		}

		this.menuItems = [
			{ icon: 'post_add', label: 'Add new', method: this.editNew },
			{ icon: 'format_indent_increase', label: 'Import list', method: this.importList },
			{ icon: 'format_indent_decrease', label: 'Export list', method: this.exportList }
		]
	},
	mounted() {
		if (process.env.MODE === 'electron') {
			const waot = JSON.parse(window.localStorage.getItem('waot')) || { state: false }
			this.alwaysOnTop = waot.state
			this.bWindow.setAlwaysOnTop(this.alwaysOnTop)
		}
	}
}
</script>
