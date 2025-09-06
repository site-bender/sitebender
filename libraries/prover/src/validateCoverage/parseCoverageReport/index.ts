import type { CoverageData } from "../parseLcovReport/index.ts"

/**
 * Parses the JSON coverage report from Deno
 * @param jsonData Raw JSON coverage data string
 * @returns Parsed coverage data structure
 */
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
