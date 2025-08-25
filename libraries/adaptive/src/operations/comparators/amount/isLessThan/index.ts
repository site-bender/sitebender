import compare from "../../comparator/index.ts"

const isLessThan = compare((o: unknown, t: unknown) =>
	(o as number) < (t as number)
)

export default isLessThan
