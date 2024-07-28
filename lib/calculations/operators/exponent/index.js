import unary from "../unary"

const exponent = op => arg => unary(op)(Math.exp)(arg)

export default exponent
