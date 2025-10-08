import type { ArchitectError } from "../types/ArchitectError.ts"
import type { ErrorCode } from "../types/ArchitectError.ts"
import type { Value } from "@sitebender/toolsmith/types/index.ts"

import createError from "../createError/index.ts"
import * as templates from "../templates/index.ts"

//++ Creates an error from a predefined template for consistent error messaging
export default function fromTemplate<TTemplate extends keyof typeof templates>(
	template: TTemplate,
) {
	return function withOperation<TOp extends string>(operation: TOp) {
		return function withArguments<TArgs extends ReadonlyArray<Value>>(
			args: TArgs,
		) {
			return function withTemplateArgs(
				...templateArgs: ReadonlyArray<string | number>
			): ArchitectError<TOp, TArgs> {
				const templateFn = templates[template]

				let messageFn:
					| ((
						arg: string | number,
					) => string | ((arg: string | number) => string))
					| string = templateFn as ((
						arg: string | number,
					) => string | ((arg: string | number) => string))

				for (const arg of templateArgs) {
					if (typeof messageFn === "function") {
						messageFn = messageFn(arg) as
							| string
							| ((arg: string | number) => string)
					}
				}

				const code = template as ErrorCode

				const message = typeof messageFn === "string"
					? messageFn
					: String(messageFn)

				return createError(operation)(args)(message)(code)
			}
		}
	}
}
