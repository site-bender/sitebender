import type CoverageData from "../parseLcovReport/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parseCoverageReport(jsonData: string): CoverageData {
	try {
		const data = JSON.parse(jsonData)

		// Deno coverage format may vary, handle common structures
		if (data.files) {
			return data as CoverageData
		}

		// If format is different, transform it
		if (Array.isArray(data)) {
			return {
				files: data.map((file) => ({
					path: file.filename || file.path,
					lines: {
						found: file.lines?.found || 0,
						hit: file.lines?.hit || 0,
						details: file.lines?.details || [],
					},
					branches: {
						found: file.branches?.found || 0,
						hit: file.branches?.hit || 0,
						details: file.branches?.details || [],
					},
				})),
			}
		}

		// Fallback for unexpected format
		return {
			files: [],
		}
	} catch (error) {
		console.error("Failed to parse coverage report:", error)
		return {
			files: [],
		}
	}
}
