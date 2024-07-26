import unary from "../unary"

const cosecant = op => arg => unary(op)(n => 1 / Math.sin(n))(arg)

export default cosecant
