import unary from "../unary"

const logBaseTwo = op => arg => unary(op)(Math.log2)(arg)

export default logBaseTwo
