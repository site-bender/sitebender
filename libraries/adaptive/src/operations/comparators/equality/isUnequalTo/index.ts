import compare from "../../compare.ts"

const isUnequalTo = compare((o: unknown, t: unknown) => o !== t)

export default isUnequalTo
