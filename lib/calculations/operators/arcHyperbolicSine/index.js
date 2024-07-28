import unary from "../unary"

const arcHyperbolicSine = op => arg => unary(op)(Math.asinh)(arg)

export default arcHyperbolicSine
