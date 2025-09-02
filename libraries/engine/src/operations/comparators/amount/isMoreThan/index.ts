import compare from "../../comparator/index.ts"

const isMoreThan = compare((o: unknown, t: unknown) =>
	(o as number) > (t as number)
)

export default isMoreThan
