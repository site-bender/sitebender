import unary from "../unary"

const cotangent = op => arg => unary(op)(n => 1 / Math.tan(n))(arg)

export default cotangent
