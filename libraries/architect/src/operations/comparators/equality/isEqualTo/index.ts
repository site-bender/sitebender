import compare from "../../comparator/index.ts"

const isEqualTo = compare((o: unknown, t: unknown) => o === t)

export default isEqualTo
