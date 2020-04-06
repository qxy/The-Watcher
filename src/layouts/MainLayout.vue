<template>
	<q-layout view="hHh lpr fFf">
		<q-header elevated>
			<q-bar class="q-electron-drag">
				<div>TV Show Tracker</div>
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
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	name: 'DefaultLayout',
	data: () => ({
		bWindow: null,
		alwaysOnTop: false
	}),
	computed: {
		iconAoT() {
			return (this.alwaysOnTop ? 'radio_button_checked' : 'radio_button_unchecked')
		}
	},
	methods: {
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
