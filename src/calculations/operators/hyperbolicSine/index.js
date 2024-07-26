import unary from "../unary"

const hyperbolicSine = op => arg => unary(op)(Math.sinh)(arg)

export default hyperbolicSine
