import { format } from 'quasar'
const { pad } = format

export default {
	number(value) {
		return pad(value, 2)
	},
	url(data, url) {
		if (!data) return ''
		return (url || data.url || '')
			.replace(/{T}/g, data.title)
			.replace(/{T\+}/g, data.title.replace(/\s+/g, '+'))
			.replace(/{S##}/g, `S${this.number(data.season)}`)
			.replace(/{E##}/g, `E${this.number(data.episode)}`)
	}
}
