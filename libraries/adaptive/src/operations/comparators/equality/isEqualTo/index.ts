import compare from "../../compare.ts"

const isEqualTo = compare((o: unknown, t: unknown) => o === t)

export default isEqualTo
