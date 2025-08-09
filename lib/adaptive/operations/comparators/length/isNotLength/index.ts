import compare from "../../compare.js"

const isNotLength = compare((operand, test) => operand.length !== test)

export default isNotLength
