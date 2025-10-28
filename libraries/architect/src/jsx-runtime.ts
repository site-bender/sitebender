import createElement from "./helpers/createElement/index.ts"
import FragmentImpl from "./helpers/Fragment/index.ts"

export const Fragment = FragmentImpl

// Minimal JSX runtime compatible with TS react-jsx transform
// Maps JSX calls to our createElement helper.
export function jsx(
	type: string | ((props: Record<string, unknown>) => unknown),
	props: Record<string, unknown>,
	key?: string | number,
) {
	const { children, ...rest } = props ?? {}
	const next = key !== undefined && key !== null ? { ...rest, key } : rest
	return createElement(type, next, children)
}

export function jsxs(
	type: string | ((props: Record<string, unknown>) => unknown),
	props: Record<string, unknown>,
	key?: string | number,
) {
	return jsx(type, props, key)
}

// Optional dev hook; we route it the same to keep things simple
export const jsxDEV = jsx
