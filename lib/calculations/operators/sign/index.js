import unary from "../unary"

const sign = op => arg => unary(op)(Math.sign)(arg)

export default sign
