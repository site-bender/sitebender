import compare from "../../compare.js"

const isLength = compare((operand, test) => operand.length === test)

export default isLength
