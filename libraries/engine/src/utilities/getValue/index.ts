import pendingGetValue from "../../pending/dom/getValue/index.ts"

// Minimal Either shape without any
type Left<L> = { left: L; right?: never }
type Right<R> = { right: R; left?: never }
type Either<L, R> = Left<L> | Right<R>

// Minimal input op surface we actually read
type InputOp = {
	source?: unknown
	id?: unknown
	name?: unknown
	tag?: unknown
} | unknown

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object"
}

function asString(v: unknown): string | undefined {
	return typeof v === "string" ? v : undefined
}

// Build a minimal ElementConfig-like object and include selector hints
const adaptToElementConfig = (op: InputOp): Record<string, unknown> => {
	const rec = isRecord(op) ? op : {}
	const source = asString(rec.source)
	const id = source?.startsWith("#") ? source.slice(1) : asString(rec.id)
	const selector = id ? undefined : source
	const name = asString(rec.name)
	const tag = asString(rec.tag) ?? "Div"

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

export default function getValue(op: InputOp) {
	return (
		localValues?: Record<string, unknown>,
	): Either<unknown, unknown> => {
		const ec = adaptToElementConfig(op)
		// Delegate to the pending DOM implementation (typed loosely via unknown)
		return pendingGetValue(ec as never)(localValues)
	}
}
