// @sitebender/arborist/src/parsers/denoAst/wasm/index.ts
// TypeScript bindings for deno_ast WASM wrapper following constitutional rules

import initWasm from "./initWasm/index.ts"
import parseWithSemantics from "./parseWithSemantics/index.ts"

// Export the functions following constitutional rules
export { initWasm, parseWithSemantics }
