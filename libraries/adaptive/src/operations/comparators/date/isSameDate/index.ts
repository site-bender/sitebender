import compare from "../../comparator/index.ts"

const isSameDate = compare((operand, test) => String(operand) === String(test))

export default isSameDate
