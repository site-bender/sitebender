import compare from "../../comparator/index.ts"

const isNoLongerThan = compare((o: unknown, t: unknown) =>
	(o as { length: number }).length <= (t as { length: number }).length
)

export default isNoLongerThan
