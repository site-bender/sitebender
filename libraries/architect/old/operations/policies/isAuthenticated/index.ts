import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
} from "@sitebender/architect-types/index.ts"

import Error from "@sitebender/architect/constructors/Error/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isAuthenticated = (_op?: unknown): OperationFunction<boolean> =>
(
	_arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, boolean>> => {
	const user = localValues && (localValues as Record<string, unknown>)["user"]
	if (user) return Promise.resolve({ right: true })
	return Promise.resolve({
		left: [
			Error("IsAuthenticated")("Authorize")("User is not authenticated."),
		],
	})
}

export default isAuthenticated
