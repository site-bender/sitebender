import type { Acc } from "../../types/index.ts"

//++ Handle stray //++ lines after description already captured
export default function processExtraDescriptionLine(_lines: Array<string>) {
	return function inner(acc: Acc) {
		return function at(lineNumber: number) {
			return function run(current: string): Acc | undefined {
				if (!current.startsWith("//++")) {
					return undefined
				}
				if (!acc.haveDescription) {
					return undefined
				}
				return {
					...acc,
					idx: acc.idx + 1,
					raw: [
						...acc.raw,
						{ line: lineNumber, marker: "//++", text: current.slice(4).trim() },
					],
					diagnostics: [
						...acc.diagnostics,
						{
							line: lineNumber,
							issue: "Extra //++ after primary description ignored",
						},
					],
				}
			}
		}
	}
}
