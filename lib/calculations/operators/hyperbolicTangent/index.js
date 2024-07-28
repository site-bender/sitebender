import unary from "../unary"

const hyperbolicTangent = op => arg => unary(op)(Math.tanh)(arg)

export default hyperbolicTangent
