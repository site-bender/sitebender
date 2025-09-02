import type { HydratedAverage } from "../../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import average from "../average/index.ts"

const mean = (op: HydratedAverage): OperationFunction<number> =>
(
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, number>> =>
	average(op)(arg, localValues)

export default mean
