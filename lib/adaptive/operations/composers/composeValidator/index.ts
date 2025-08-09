import composeComparators from "../composeComparators/index.js"

const composeValidator = (op) => composeComparators(op)

export default composeValidator
