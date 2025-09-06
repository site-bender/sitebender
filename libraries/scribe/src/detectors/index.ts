/**
 * Detector module exports
 */

export { default as detectPurity } from "./detectPurity/index.ts"
export { default as detectCurrying } from "./detectCurrying/index.ts"
export { default as detectComplexity } from "./detectComplexity/index.ts"
export { default as detectProperties } from "./detectProperties/index.ts"
export { isIdempotent, isCommutative, isAssociative, isDistributive } from "./detectMathProperties/index.ts"