import unary from "../unary"

const naturalLog = op => arg => unary(op)(Math.log)(arg)

export default naturalLog
