import compare from "../../compare"

const isNotLength = compare((operand, test) => operand.length !== test)

export default isNotLength
