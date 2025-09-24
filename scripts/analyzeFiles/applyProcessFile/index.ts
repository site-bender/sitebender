import type { PerFileAnalysis } from "../types/index.ts"

//++ Applies the process file function and returns null for reduce
export default function applyProcessFile(
	processFn: (file: PerFileAnalysis) => void
): (acc: null, file: PerFileAnalysis) => null {
	return function applyProcessFileImpl(
		_: null,
		file: PerFileAnalysis
	): null {
		processFn(file)
		return null
	}
}