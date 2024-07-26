import unary from "../unary"

const reciprocal = op => arg => unary(op)(n => 1 / n)(arg)

export default reciprocal
