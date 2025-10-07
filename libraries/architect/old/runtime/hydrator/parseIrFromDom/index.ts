import type { IrDocument } from "../../../../types/ir/index.ts"

export default function parseIrFromDom(
	scriptId = "ir-root",
): IrDocument | null {
	const el = globalThis.document?.getElementById(scriptId)
	if (!el) return null
	try {
		return JSON.parse(el.textContent || "") as IrDocument
	} catch {
		return null
	}
}
