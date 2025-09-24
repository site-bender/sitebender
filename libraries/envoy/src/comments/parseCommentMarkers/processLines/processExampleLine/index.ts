import type { Acc } from "../../types/index.ts"

import parseExamplePayload from "../../parseExamplePayload/index.ts"

//++ Handle single-line //?? example line
export default function processExampleLine(_lines: Array<string>) {
	return function inner(acc: Acc) {
		return function at(lineNumber: number) {
			return function run(current: string): Acc | undefined {
				if (!current.startsWith("//??")) {
					return undefined
				}
				const payload = current.slice(4).trim()
				const parsed = parseExamplePayload(payload)

				return {
					...acc,
					idx: acc.idx + 1,
					examples: [
						...acc.examples,
						parsed,
					],
					raw: [
						...acc.raw,
						{ line: lineNumber, marker: "//??", text: payload },
					],
				}
			}
		}
	}
}
