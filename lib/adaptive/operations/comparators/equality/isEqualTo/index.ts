import type { AdaptiveError, ComparatorConfig, Either, GlobalAttributes, LocalValues, OperationFunction, Value } from "../../../../types/index.ts"

import compare from "../../compare.ts"

const isEqualTo = (op: ComparatorConfig): OperationFunction<boolean> => async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {

export default isEqualTo
