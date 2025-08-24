import type { IrDocument } from "../types/json/ir/index.ts"

export function renderIrScript(ir: IrDocument, scriptId = "ir-root"): string {
  const json = JSON.stringify(ir)
  return `<script type="application/adaptive+json" id="${scriptId}">${json}</script>`
}
