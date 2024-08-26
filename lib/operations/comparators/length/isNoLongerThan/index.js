import compare from "../../compare"

const isNoLongerThan = compare((operand, test) => operand.length <= test)

export default isNoLongerThan
