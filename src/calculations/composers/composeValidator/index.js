import composeComparators from "../composeComparators"

const composeValidator = op => composeComparators(op)

export default composeValidator
