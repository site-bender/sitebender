import compare from "../../compare"

const isNoShorterThan = compare((operand, test) => operand.length >= test)

export default isNoShorterThan
