import unary from "../unary"

const arcHyperbolicTangent = op => arg => unary(op)(Math.atanh)(arg)

export default arcHyperbolicTangent
