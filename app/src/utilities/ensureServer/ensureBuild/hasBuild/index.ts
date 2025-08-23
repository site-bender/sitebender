const hasBuild = async (): Promise<boolean> => {
	try {
		const stat = await Deno.stat("dist")
		if (!stat.isDirectory) return false

		const indexExists = await Deno.stat("dist/index.html")
			.then(() => true)
			.catch(() => false)
		return indexExists
	} catch {
		return false
	}
}

export default hasBuild
