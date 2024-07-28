import unary from "../unary"

const arcCosine = op => arg => unary(op)(Math.acos)(arg)

export default arcCosine
