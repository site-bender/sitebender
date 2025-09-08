import type { Acc } from '../../types/index.ts'
import consumeBlock from '../../consumeBlock/index.ts'

//++ Handle multi-line /*++ description block when no prior description
export default function processDescriptionBlock(lines: Array<string>) {
  return function inner(acc: Acc) {
    return function at(lineNumber: number) {
      return function run(current: string): Acc | undefined {
        if (acc.haveDescription) {
          return undefined
        }
        if (!current.startsWith('/*++')) {
          return undefined
        }
        const consumed = consumeBlock(lines, acc.idx, '/*++')
        const have = consumed.terminated && consumed.collected.length > 0

        return {
          ...acc,
          idx: consumed.nextIdx,
          haveDescription: acc.haveDescription || have,
          descriptionParts: acc.haveDescription
            ? acc.descriptionParts
            : (have ? consumed.collected : acc.descriptionParts),
          raw: consumed.terminated
            ? [
              ...acc.raw,
              { line: lineNumber, marker: '/*++', text: consumed.collected.join(' ') },
            ]
            : acc.raw,
          diagnostics: consumed.terminated
            ? acc.diagnostics
            : [
              ...acc.diagnostics,
              { line: lineNumber, issue: 'Unterminated /*++ block' },
            ],
        }
      }
    }
  }
}
