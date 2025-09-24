import type { Acc } from "../../types/index.ts"

import map from "../../../../../../toolsmith/src/vanilla/array/map/index.ts"
import consumeBlock from "../../consumeBlock/index.ts"
import parseExamplePayload from "../../parseExamplePayload/index.ts"

//++ Handle multi-line /*?? example block
export default function processExampleBlock(lines: Array<string>) {
	return function inner(acc: Acc) {
		return function at(lineNumber: number) {
			return function run(current: string): Acc | undefined {
				if (!current.startsWith("/*??")) {
					return undefined
				}

				const consumed = consumeBlock(lines, acc.idx, "/*??")

				const examples = map((rawLine: string) => ({
					...parseExamplePayload(rawLine),
					line: lineNumber,
					raw: rawLine,
				}))(consumed.collected)

				return {
					...acc,
					idx: consumed.nextIdx,
					examples: [...acc.examples, ...examples],
					raw: [
						...acc.raw,
						{
							line: lineNumber,
							marker: "/*??",
							text: consumed.collected.join(" | "),
						},
					],
					diagnostics: consumed.collected.length ? acc.diagnostics : [
						...acc.diagnostics,
						{ line: lineNumber, issue: "Empty /*?? block" },
					],
				}
			}
		}
	}
}
