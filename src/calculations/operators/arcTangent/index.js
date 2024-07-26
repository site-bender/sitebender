import unary from "../unary"

const arcTangent = op => arg => unary(op)(Math.atan)(arg)

export default arcTangent
