// @sitebender/arborist/src/api/parseFileWithSemantics
// Public API for semantic parsing

import parseFileWithSemantics from "../../parsers/denoAst/parseFile.ts"

//++ Parse file with full semantic analysis (replaces Envoy's missing parseFileWithCompiler)
export default parseFileWithSemantics
