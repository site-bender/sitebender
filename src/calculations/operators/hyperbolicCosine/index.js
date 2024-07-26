import unary from "../unary"

const hyperbolicCosine = op => arg => unary(op)(Math.cosh)(arg)

export default hyperbolicCosine
