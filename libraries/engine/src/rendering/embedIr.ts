import type { IrDocument } from "../../types/ir/index.ts"

export default function renderIrScript(
	ir: IrDocument,
	scriptId = "ir-root",
): string {
	const json = JSON.stringify(ir)
	return `<script type="application/engine+json" id="${scriptId}">${json}</script>`
}
