import unary from "../unary"

const arcSine = op => arg => unary(op)(Math.asin)(arg)

export default arcSine
