import { isLeft } from "../../../../types/index.ts"
import Error from "../../../constructors/Error/index.ts"
import castValue from "../../../utilities/castValue/index.ts"
import composeComparators from "../../composers/composeComparators/index.ts"
import getErrorMessage from "./getErrorMessage/index.ts"

type ComparatorPredicate = (o: unknown, t: unknown) => boolean

// Keep types broad to avoid deep coupling; runtime behavior stays identical.
export const compare = (comparator: ComparatorPredicate) =>
	(op: unknown) =>
		async (arg: unknown, localValues?: unknown): Promise<unknown> => {
			const operandFn: unknown = await composeComparators((op as any).operand)
			const testFn: unknown = await composeComparators((op as any).test)

			const operand = await (operandFn as (a: unknown, l?: unknown) => Promise<unknown>)(arg, localValues)
			const test = await (testFn as (a: unknown, l?: unknown) => Promise<unknown>)(arg, localValues)

			if (isLeft(operand as any)) {
				return isLeft(test as any)
					? { left: [...(operand as any).left, ...(test as any).left] }
					: { left: [...(operand as any).left, test] }
			}

			if (isLeft(test as any)) {
				return { left: [operand, ...(test as any).left] }
			}

			const o = castValue((op as any).operand?.datatype)(operand)
			const t = castValue((op as any).test?.datatype)(test)

			if (isLeft(t as any)) {
				return isLeft(o as any)
					? { left: [...(t as any).left, ...(o as any).left] }
					: { left: [...(t as any).left, o] }
			}

			if (isLeft(o as any)) {
				return { left: [t, ...(o as any).left] }
			}

	    return comparator((o as any).right, (t as any).right) ? operand : {
				left: [
		    Error("Comparison")((op as any).tag)(`${(o as any).right} ${getErrorMessage(op as any)} ${(t as any).right}.`),
				],
			}
		}

export default compare
