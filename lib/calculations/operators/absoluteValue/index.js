import unary from "../unary"

const absoluteValue = op => arg => unary(op)(Math.abs)(arg)

export default absoluteValue
