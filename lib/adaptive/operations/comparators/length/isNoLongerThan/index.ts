import compare from "../../compare.js"

const isNoLongerThan = compare((operand, test) => operand.length <= test)

export default isNoLongerThan
