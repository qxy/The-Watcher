import fs from 'fs'

export default {

	state: {
		showList: []
	},

	importList(fileName) {
		try {
			const jsonData = fs.readFileSync(fileName)
			const data = JSON.parse(jsonData)
			// clear array!
			while (!!this.state.showList.pop());
			// import data
			data.forEach(sData => {
				sData.season *= 1
				sData.episode *= 1
				this.state.showList.push(sData)
			})
			this.sortList()
			this.saveData()
			return false
		}
		catch(e) {
			return `Import failed: ${e.message}`
		}
	},
	exportList(fileName) {
		try {
			const jsonData = JSON.stringify(this.state.showList)
			fs.writeFileSync(fileName, jsonData)
			return false
		}
		catch(e) {
			return `Export failed: ${e.message}`
		}
	},
	sortList() {
		this.state.showList = this.state.showList.sort((a, b) => {
			const t1 = a.title.toLowerCase()
			const t2 = b.title.toLowerCase()
			return (t1 > t2) ? 1 : (t2 > t1) ? -1 : 0
		})
	},
	loadData() {
		const list = JSON.parse(window.localStorage.getItem('list'))
		this.state.showList = list || []
		console.log('Data loaded!')
	},
	saveData() {
		const list = JSON.stringify(this.state.showList)
		window.localStorage.setItem('list', list)
		console.log('Data saved!')
	},
	getData(id) {
		const data = this.state.showList[id]
		return data instanceof Object
			? { id, data } // existing entry
			: { id: -1, data: {	// new entry
				active: true,
				title: '',
				season: 1,
				episode: 1,
				url: ''
			}}
	},
	setData(id, data) {
		data.season *= 1
		data.episode *= 1

		if (id == -1) {
			this.state.showList.push(data)
		}
		else {
			this.state.showList[id] = data
		}
		this.sortList()
		this.saveData()
	},
	deleteData(id) {
		if (id >= 0 && id < this.state.showList.length) {
			this.state.showList.splice(id, 1)
			this.saveData()
		}
	}
}
