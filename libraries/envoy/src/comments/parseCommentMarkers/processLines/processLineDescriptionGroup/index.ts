import type { Acc } from "../../types/index.ts"

import map from "../../../../../../toolsmith/src/vanilla/array/map/index.ts"
import slice from "../../../../../../toolsmith/src/vanilla/array/slice/index.ts"
import consumeContiguous from "../../consumeContiguous/index.ts"

//++ Handle leading group of //++ lines capturing first as description
export default function processLineDescriptionGroup(lines: Array<string>) {
	return function inner(acc: Acc) {
		return function at(lineNumber: number) {
			return function run(current: string): Acc | undefined {
				if (acc.haveDescription) {
					return undefined
				}
				if (!current.startsWith("//++")) {
					return undefined
				}
				const group = consumeContiguous(lines, acc.idx, "//++")
				const first = group.items[0].slice(4).trim()

				const restItems = slice(1)(undefined)<string>(group.items)
				const rest = map((s: string) => s.slice(4).trim())(restItems)

				const strayRaws = map((text: string, i: number) => ({
					line: lineNumber + 1 + i,
					marker: "//++",
					text,
				}))(rest)

				const strayDiagnostics = map((_: string, i: number) => ({
					line: lineNumber + 1 + i,
					issue: "Extra //++ after primary description ignored",
				}))(rest)

				return {
					...acc,
					idx: group.nextIdx,
					haveDescription: true,
					descriptionParts: [first],
					raw: [
						...acc.raw,
						{ line: lineNumber, marker: "//++", text: first },
						...strayRaws,
					],
					diagnostics: [
						...acc.diagnostics,
						...strayDiagnostics,
					],
				}
			}
		}
	}
}
