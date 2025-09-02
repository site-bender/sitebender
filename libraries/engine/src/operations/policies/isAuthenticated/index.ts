import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "@engineTypes/index.ts"

import Error from "@engineSrc/constructors/Error/index.ts"

/**
 * On.IsAuthenticated
 *
 * Minimal policy op: returns right(true) when LocalValues.user exists/truthy,
 * otherwise left([Error]). Ignores arg and any config.
 */
const isAuthenticated = (_op?: unknown): OperationFunction<boolean> =>
(
	_arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, boolean>> => {
	const user = localValues && (localValues as Record<string, unknown>)["user"]
	if (user) return Promise.resolve({ right: true })
	return Promise.resolve({
		left: [
			Error("IsAuthenticated")("Authorize")("User is not authenticated."),
		],
	})
}

export default isAuthenticated
