const collectScriptElements = (component: any): any[] => {
	const scriptElements = Object.entries(component).reduce(
		(scripts: any[], [key, value]: [string, any]) => {
			if (key === "scripts") {
				scripts.push(...value)
			}

			if (key === "children") {
				const childScripts = value?.reduce((out: any[], item: any) => {
					return out.concat(collectScriptElements(item))
				}, [])

				if (childScripts) {
					scripts.push(...childScripts)
				}
			}

			return scripts
		},
		[],
	)

	return scriptElements
}

export default collectScriptElements
