import isNullish from "../isNullish/index.ts"

// (JSDoc removed in favor of Envoy)
//++ Alias for isNullish — true for null or undefined
const isNil = isNullish

export default isNil

//?? [EXAMPLE] isNil(null) // true
//?? [EXAMPLE] isNil(0) // false
