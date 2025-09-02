import type {
	EngineError,
	Either,
	LocalValues,
} from "../../../types/index.ts"

import { isLeft } from "../../../types/index.ts"
import Error from "../../constructors/Error/index.ts"
import composeOperators from "../../operations/composers/composeOperators/index.ts"
import castValue from "../../utilities/castValue/index.ts"
import getValue from "../../utilities/getValue/index.ts"
import isDefined from "../../utilities/isDefined/index.ts"

type LookupOp = {
	tag: string
	datatype?: string
	column: unknown
	test: unknown
}

const fromLookupTable = (op: LookupOp) =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, unknown>> => {
	const { datatype = "Json" } = op

	const columnFn = await composeOperators(op.column as never)
	const testFn = await composeOperators(op.test as never)
	const column = await columnFn(arg, localValues)
	const test = await testFn(arg, localValues)

	if (isLeft(column)) return column
	if (isLeft(test)) return test

	const col = column.right as number
	const table = castValue(datatype)(
		getValue(op as unknown as { source: unknown })(localValues),
	)

	if (isDefined((table as { left?: unknown }).left)) {
		const msg = String((table as { left?: unknown }).left)
		return { left: [Error(op.tag)("FromLookupTable")(msg)] }
	}

	const rows = (table as { right?: unknown }).right as Array<unknown>
	if (!Array.isArray(rows) || rows.length === 0) return { right: undefined }

	const out = (rows as Array<Record<string | number, unknown>>).reduce(
		(acc, row) => {
			const val = row[col]
			const cond = row[0 as unknown as keyof typeof row] as unknown as number
			return (test.right as number) >= (cond ?? 0) ? val : acc
		},
		(rows[0] as Record<string | number, unknown>)[col],
	)

	return { right: out }
}

export default fromLookupTable
