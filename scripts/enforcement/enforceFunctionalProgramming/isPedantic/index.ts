import includes from "@sitebender/toolsmith/array/includes/index.ts"

export default function isPedantic(args: Array<string>): boolean {
	return includes("--pedantic")(args)
}
