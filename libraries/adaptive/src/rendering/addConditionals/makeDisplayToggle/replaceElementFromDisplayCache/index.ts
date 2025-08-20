const replaceElementFromDisplayCache = (id) => {
	if (document) {
		const slot = document.querySelector(`slot[name=${id}]`)
		const element = document.__sbDisplayCache && document.__sbDisplayCache[id]

		if (slot && element) {
			slot.after(element)
			slot.remove()

			delete document.__sbDisplayCache[id]
		}
	}
}

export default replaceElementFromDisplayCache
