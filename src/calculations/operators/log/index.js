import unary from "../unary"

const log = op => arg => unary(op)(Math.log10)(arg)

export default log
