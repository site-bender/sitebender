import type { HydratedAverage } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import average from "../average/index.ts"

const mean = (op: HydratedAverage): OperationFunction<number> =>
(
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, number>> => average(op)(arg, localValues)

export default mean
