import average from "../average"

const mean = op => async arg => average(op)(arg)

export default mean
