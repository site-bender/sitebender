import compare from "../../comparator/index.ts"

const isNoMoreThan = compare((operand: unknown, test: unknown) =>
	(operand as number) <= (test as number)
)

export default isNoMoreThan
