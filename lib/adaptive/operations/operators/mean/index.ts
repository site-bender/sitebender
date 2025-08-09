import average from "../average.js"

const mean = (op) => async (arg, localValues) => average(op)(arg, localValues)

export default mean
