import type { HydratedAverage } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import average from "../average/index.ts"

const mean = (op: HydratedAverage): OperationFunction<number> =>
(
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, number>> => average(op)(arg, localValues)

export default mean
