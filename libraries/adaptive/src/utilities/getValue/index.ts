import pendingGetValue from "../../pending/dom/getValue/index.ts"

// Minimal adapter so legacy callers can pass selector-like ops
// deno-lint-ignore no-explicit-any
type AnyEither = { left: any } | { right: any }

// deno-lint-ignore no-explicit-any
type InputOp = any

// Build a minimal ElementConfig-like object and include selector hints
// deno-lint-ignore no-explicit-any
const adaptToElementConfig = (op: InputOp): any => {
	const source: string | undefined = op?.source
	const id = source?.startsWith("#") ? source.slice(1) : op?.id
	const selector = id ? undefined : source
	const name: string | undefined = op?.name
	const tag: string = op?.tag ?? "Div"

	const elementLike: Record<string, unknown> = {
		tag,
		attributes: {},
		children: [],
	}

	if (id) elementLike.id = id
	if (name) elementLike.name = name
	if (selector) elementLike.selector = selector

	return elementLike
}

const getValue =
	(op: InputOp) => (localValues?: Record<string, unknown>): AnyEither => {
		const ec = adaptToElementConfig(op)
		// Delegate to the pending DOM implementation
		return pendingGetValue(ec as never)(localValues)
	}

export default getValue
