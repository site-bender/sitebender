import compare from "../../compare"

const isLength = compare((operand, test) => operand.length === test)

export default isLength
