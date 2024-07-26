import unary from "../unary"

const tangent = op => arg => unary(op)(Math.tan)(arg)

export default tangent
