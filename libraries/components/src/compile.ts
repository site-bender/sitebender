import type { IrDocument } from "../../engine/types/ir/index.ts"

import compileToEngineImpl from "./transform/compile/toEngineIr.ts"

// Mirror the implementation signature so tests keep working.
export function compileToEngine(
	children?: unknown,
): IrDocument {
	// Delegate to the concrete implementation.
	// The underlying module accepts MaybeVNode | MaybeVNode[] | undefined.
	return compileToEngineImpl(children as unknown)
}
