<template>
	<q-layout view="hHh lpr fFf">
		<q-header elevated>
			<q-bar class="q-electron-drag">
				<div>TV Show Tracker</div>
				<q-space />
				<q-btn dense flat icon="minimize" @click="minimize" />
				<q-btn dense flat icon="crop_square" @click="maximize" />
				<q-btn dense flat icon="close" @click="closeApp" />
			</q-bar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	name: 'DefaultLayout',
	methods: {
		minimize() {
			if (process.env.MODE === 'electron') {
				this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
			}
		},
		maximize() {
			if (process.env.MODE === 'electron') {
				const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

				if (win.isMaximized()) {
					win.unmaximize()
				} else {
					win.maximize()
				}
			}
		},
		closeApp() {
			if (process.env.MODE === 'electron') {
				this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
			}
		}
	}
}
</script>