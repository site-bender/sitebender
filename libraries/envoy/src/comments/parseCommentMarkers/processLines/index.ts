import type { Acc } from "../types/index.ts"

import processDescriptionBlock from "./processDescriptionBlock/index.ts"
import processExampleBlock from "./processExampleBlock/index.ts"
import processExampleLine from "./processExampleLine/index.ts"
import processExtraDescriptionLine from "./processExtraDescriptionLine/index.ts"
import processLineDescriptionGroup from "./processLineDescriptionGroup/index.ts"
import processTechDebtLine from "./processTechDebtLine/index.ts"

type Handler = (
	lines: Array<string>,
) => (acc: Acc) => (ln: number) => (text: string) => Acc | undefined

const handlers: Array<Handler> = [
	processDescriptionBlock,
	processLineDescriptionGroup,
	processExtraDescriptionLine,
	processExampleLine,
	processTechDebtLine,
	processExampleBlock,
]

//++ Recursive line processor for legacy comment parser (acc first, lines last)
export default function processLines() {
	return function withAcc(initial: Acc) {
		return function withLines(lines: Array<string>): Acc {
			function step(acc: Acc): Acc {
				if (acc.idx >= lines.length) {
					return acc
				}

				const ln = acc.idx + 1
				const text = lines[acc.idx].trim()

				function attempt(i: number): Acc | undefined {
					if (i >= handlers.length) {
						return undefined
					}
					const next = handlers[i](lines)(acc)(ln)(text)
					return next ?? attempt(i + 1)
				}

				const updated = attempt(0)

				if (updated) {
					return step(updated)
				}

				return step({ ...acc, idx: acc.idx + 1 })
			}

			return step(initial)
		}
	}
}
