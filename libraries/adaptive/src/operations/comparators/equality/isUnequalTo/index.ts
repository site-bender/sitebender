import compare from "../../comparator/index.ts"

const isUnequalTo = compare((o: unknown, t: unknown) => o !== t)

export default isUnequalTo
