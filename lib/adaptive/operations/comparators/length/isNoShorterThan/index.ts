import compare from "../../compare.js"

const isNoShorterThan = compare((operand, test) => operand.length >= test)

export default isNoShorterThan
