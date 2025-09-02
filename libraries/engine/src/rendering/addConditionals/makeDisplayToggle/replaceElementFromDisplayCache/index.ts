const replaceElementFromDisplayCache = (id: string) => {
	if (document) {
		const slot = document.querySelector(`slot[name=${id}]`)
		const element = document.__sbDisplayCache && document.__sbDisplayCache[id]

		if (slot && element) {
			slot.after(element)
			slot.remove()

			if (document.__sbDisplayCache) delete document.__sbDisplayCache[id]
		}
	}
}

export default replaceElementFromDisplayCache
