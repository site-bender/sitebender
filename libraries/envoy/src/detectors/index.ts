//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export { default as detectPurity } from "./detectPurity/index.ts"
export { default as detectCurrying } from "./detectCurrying/index.ts"
export { default as detectComplexity } from "./detectComplexity/index.ts"
export { default as detectProperties } from "./detectProperties/index.ts"
export {
	isAssociative,
	isCommutative,
	isDistributive,
	isIdempotent,
} from "./detectMathProperties/index.ts"
