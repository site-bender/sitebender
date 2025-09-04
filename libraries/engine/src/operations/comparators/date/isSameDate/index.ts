import compare from "../../comparator/index.ts"

const isSameDate = compare((operand: unknown, test: unknown) => String(operand) === String(test))

export default isSameDate
