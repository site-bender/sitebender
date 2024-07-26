import unary from "../unary"

const arcHyperbolicCosine = op => arg => unary(op)(Math.acosh)(arg)

export default arcHyperbolicCosine
