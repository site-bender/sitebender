import unary from "../unary"

const sine = op => arg => unary(op)(Math.sin)(arg)

export default sine
