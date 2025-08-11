function generateMicrodata(data: Record<string, unknown>): JSX.Element {
	const generateElement = (
		obj: Record<string, unknown>,
		isRoot = false,
		itemProp?: string,
	): JSX.Element => {
		const type = obj["@type"] as string
		const itemType = type ? `https://schema.org/${type}` : undefined

		const props = {
			...(isRoot && { class: "microdata" }),
			itemscope: true,
			...(itemType && { itemtype: itemType }),
			...(itemProp && { itemprop: itemProp }),
		}

		const children = Object.entries(obj)
			.filter(([key]) => key !== "@type")
			.map(([key, value]) => {
				if (value && typeof value === "object" && !Array.isArray(value)) {
					return generateElement(value as Record<string, unknown>, false, key)
				}
				return <meta itemprop={key} content={String(value)} key={key} />
			})

		return <span {...props}>{children}</span>
	}

	return generateElement(data, true)
}

export default generateMicrodata
