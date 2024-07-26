import unary from "../unary"

const cosine = op => arg => unary(op)(Math.cos)(arg)

export default cosine
