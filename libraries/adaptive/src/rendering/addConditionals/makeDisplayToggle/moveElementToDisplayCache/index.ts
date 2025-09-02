const moveElementToDisplayCache = (id: string) => {
	const element = document.getElementById(id)

	if (element && document) {
		const slot = document.createElement("SLOT")

		slot.setAttribute("name", id)

		element.after(slot)
		element.remove()

		document.__sbDisplayCache ??= {}
		document.__sbDisplayCache[element.id] = element
	}
}

export default moveElementToDisplayCache
