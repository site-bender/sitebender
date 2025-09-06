import type CoverageData from "./types/index.ts"

/**
 * Parses LCOV coverage report from Deno
 * @param lcovData Raw LCOV data string
 * @returns Parsed coverage data structure
 */
export default function parseLcovReport(lcovData: string): CoverageData {
	const processLine = (
		acc: { files: CoverageData['files'], current: CoverageData['files'][0] | null },
		line: string
	): { files: CoverageData['files'], current: CoverageData['files'][0] | null } => {
		if (line.startsWith('SF:')) {
			const newFiles = acc.current ? [...acc.files, acc.current] : acc.files
			return {
				files: newFiles,
				current: {
					path: line.substring(3),
					lines: { found: 0, hit: 0, details: [] },
					branches: { found: 0, hit: 0, details: [] }
				}
			}
		}
		
		if (line.startsWith('DA:') && acc.current) {
			const [lineNum, hitCount] = line.substring(3).split(',').map(Number)
			return {
				files: acc.files,
				current: {
					...acc.current,
					lines: {
						found: acc.current.lines.found + 1,
						hit: hitCount > 0 ? acc.current.lines.hit + 1 : acc.current.lines.hit,
						details: [...acc.current.lines.details, { line: lineNum, hit: hitCount }]
					}
				}
			}
		}
		
		if (line.startsWith('BRDA:') && acc.current) {
			const parts = line.substring(5).split(',')
			const lineNum = Number(parts[0])
			const branch = Number(parts[1])
			const taken = parts[3] === '-' ? 0 : Number(parts[3])
			return {
				files: acc.files,
				current: {
					...acc.current,
					branches: {
						found: acc.current.branches.found + 1,
						hit: taken > 0 ? acc.current.branches.hit + 1 : acc.current.branches.hit,
						details: [...acc.current.branches.details, { line: lineNum, branch, taken }]
					}
				}
			}
		}
		
		if (line === 'end_of_record' && acc.current) {
			return {
				files: [...acc.files, acc.current],
				current: null
			}
		}
		
		return acc
	}
	
	const lines = lcovData.split('\n')
	const result = lines.reduce(processLine, { files: [], current: null })
	
	return {
		files: result.current ? [...result.files, result.current] : result.files
	}
}