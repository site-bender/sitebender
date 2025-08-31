import { isLeft } from "../../../../types/index.ts"
import Error from "../../../constructors/Error/index.ts"
import castValue from "../../../utilities/castValue/index.ts"
import composeComparators from "../../composers/composeComparators/index.ts"
import getErrorMessage from "./getErrorMessage/index.ts"

type ComparatorPredicate = (o: unknown, t: unknown) => boolean

// Keep types broad to avoid deep coupling; runtime behavior stays identical.
export const compare =
	(comparator: ComparatorPredicate) =>
	(op: unknown) =>
	async (arg: unknown, localValues?: unknown): Promise<unknown> => {
		const operandFn = await composeComparators(
			(op as { operand?: unknown } | undefined)?.operand as never,
		)
		const testFn = await composeComparators(
			(op as { test?: unknown } | undefined)?.test as never,
		)

		const operand =
			await (operandFn as (a: unknown, l?: unknown) => Promise<unknown>)(
				arg,
				localValues,
			)
		const test =
			await (testFn as (a: unknown, l?: unknown) => Promise<unknown>)(
				arg,
				localValues,
			)

		if (isLeft(operand as { left: unknown } | { right: unknown })) {
			return isLeft(test as { left: unknown } | { right: unknown })
				? {
					left: [
						...(operand as { left: unknown[] }).left,
						...(test as { left: unknown[] }).left,
					],
				}
				: { left: [...(operand as { left: unknown[] }).left, test] }
		}

		if (isLeft(test as { left: unknown } | { right: unknown })) {
			return { left: [operand, ...(test as { left: unknown[] }).left] }
		}

		const o = castValue(
			(op as { operand?: { datatype?: unknown } })?.operand?.datatype,
		)((operand as { right: unknown }).right)
		const t = castValue(
			(op as { test?: { datatype?: unknown } })?.test?.datatype,
		)((test as { right: unknown }).right)

		if (isLeft(t as { left: unknown } | { right: unknown })) {
			return isLeft(o as { left: unknown } | { right: unknown })
				? {
					left: [
						...(t as { left: unknown[] }).left,
						...(o as { left: unknown[] }).left,
					],
				}
				: { left: [...(t as { left: unknown[] }).left, o] }
		}

		if (isLeft(o as { left: unknown } | { right: unknown })) {
			return { left: [t, ...(o as { left: unknown[] }).left] }
		}

		const or = (o as { right: unknown }).right
		const tr = (t as { right: unknown }).right

		return comparator(or, tr) ? operand : {
			left: [
				Error("Comparison")((op as { tag?: string }).tag ?? "Unknown")(
					`${String(or)} ${
						getErrorMessage(op as unknown as { tag: string } as never)
					} ${String(tr)}.`,
				),
			],
		}
	}

export default compare
