import compare from "../../comparator/index.ts"

const isNoLessThan = compare((o: unknown, t: unknown) =>
	(o as number) >= (t as number)
)

export default isNoLessThan
