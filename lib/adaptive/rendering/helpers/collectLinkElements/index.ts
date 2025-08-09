const collectLinkElements = (component: any): any[] => {
	const linkElements = Object.entries(component).reduce(
		(links: any[], [key, value]: [string, any]) => {
			if (key === "dependencies") {
				links.push(...value)
			}

			if (key === "children") {
				const childLinks = value?.reduce((out: any[], item: any) => {
					return out.concat(collectLinkElements(item))
				}, [])

				if (childLinks) {
					links.push(...childLinks)
				}
			}

			return links
		},
		[],
	)

	return linkElements
}

export default collectLinkElements
