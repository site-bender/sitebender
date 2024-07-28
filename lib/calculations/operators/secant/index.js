import unary from "../unary"

const secant = op => arg => unary(op)(n => 1 / Math.cos(n))(arg)

export default secant
