import type { IrDocument } from "../../artificer/types/ir/index.ts"

import compileToArchitectImpl from "./transform/compile/toArchitectIr.ts"

// Mirror the implementation signature so tests keep working.
export function compileToArchitect(
	children?: unknown,
): IrDocument {
	// Delegate to the concrete implementation.
	// The underlying module accepts MaybeVNode | MaybeVNode[] | undefined.
	return compileToArchitectImpl(children as unknown)
}
