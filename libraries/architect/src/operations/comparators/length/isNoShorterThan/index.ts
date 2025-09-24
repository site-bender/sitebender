import compare from "../../comparator/index.ts"

const isNoShorterThan = compare((o: unknown, t: unknown) =>
	(o as { length: number }).length >= (t as { length: number }).length
)

export default isNoShorterThan
