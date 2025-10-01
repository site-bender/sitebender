import type { ArchitectError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import createError from "../createError/index.ts"

//++ Composes error transformations in a pipeline to build rich error objects
export default function pipeError<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(
		args: TArgs,
	) {
		return function withMessage(message: string) {
			return function withTransforms<T extends ArchitectError<TOp, TArgs>>(
				...transforms: Array<(error: T) => T>
			): T {
				const initialError = createError(operation)(args)(message)() as T

				return transforms.reduce(
					function applyTransform(error, transform) {
						return transform(error)
					},
					initialError,
				)
			}
		}
	}
}
