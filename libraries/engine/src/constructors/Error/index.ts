import type { ErrorConfig } from "@sitebender/engine-types/error/index.ts"

const Error = (operation: string) =>
(type: string) =>
(
	message: string,
): ErrorConfig => ({
	tag: "Error",
	message,
	operation,
	type,
})

export default Error
