import type { Acc } from "../../types/index.ts"

//++ Handle single-line //-- tech debt line
export default function processTechDebtLine(_lines: Array<string>) {
	return function inner(acc: Acc) {
		return function at(lineNumber: number) {
			return function run(current: string): Acc | undefined {
				if (!current.startsWith("//--")) {
					return undefined
				}

				const reason = current.slice(4).trim()

				return {
					...acc,
					idx: acc.idx + 1,
					techDebt: [
						...acc.techDebt,
						{ line: lineNumber, reason, raw: reason },
					],
					raw: [
						...acc.raw,
						{ line: lineNumber, marker: "//--", text: reason },
					],
					diagnostics: reason ? acc.diagnostics : [
						...acc.diagnostics,
						{ line: lineNumber, issue: "Empty tech debt reason" },
					],
				}
			}
		}
	}
}
