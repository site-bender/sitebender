type CoverageData = {
	files: Array<{
		path: string
		lines: {
			found: number
			hit: number
			details: Array<{
				line: number
				hit: number
			}>
		}
		branches: {
			found: number
			hit: number
			details: Array<{
				line: number
				branch: number
				taken: number
			}>
		}
	}>
}

export default CoverageData
