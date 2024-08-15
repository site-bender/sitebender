import average from "../average"

const mean = op => async (arg, localValues) => average(op)(arg, localValues)

export default mean
