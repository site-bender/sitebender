// Thin wrapper that defers loading the heavy implementation to runtime via dynamic import
// and provides a stable type surface for focused type-checks. Keeping the types broad
// prevents Deno from needing to resolve deep dependencies during "deno check" runs.
export type ComparatorFn = (o: unknown, t: unknown) => boolean

type CompareImpl = (p: ComparatorFn) => (op: unknown) => (
	arg: unknown,
	localValues?: unknown,
) => Promise<unknown>

const compare = (predicate: ComparatorFn) =>
(op: unknown) =>
async (
	arg: unknown,
	localValues?: unknown,
): Promise<unknown> => {
	// Use computed path to discourage static analysis from preloading the module.
	const path = ["./compare", "/index.ts"].join("")
	const mod = (await import(path)) as { default: CompareImpl }
	return mod.default(predicate)(op)(arg, localValues)
}

export default compare
