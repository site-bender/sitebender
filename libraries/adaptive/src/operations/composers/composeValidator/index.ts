import composeComparators from "../composeComparators/index.ts"

const composeValidator = (op) => composeComparators(op)

export default composeValidator
