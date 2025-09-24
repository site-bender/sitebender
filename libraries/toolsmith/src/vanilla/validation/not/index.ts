// (JSDoc removed in favor of Envoy)
//++ Logical NOT — boolean negation of a value's truthiness
const not = <T>(value: T): boolean => !value

export default not

//?? [EXAMPLE] not(true) // false
//?? [EXAMPLE] not(0) // true
