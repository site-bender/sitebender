import compare from "../../compare.ts"

const isSameLength = compare((o: unknown, t: unknown) =>
	(o as { length: number }).length === (t as { length: number }).length
)

export default isSameLength
