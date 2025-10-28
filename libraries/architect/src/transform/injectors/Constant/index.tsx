//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type ConstantProps = { value: unknown }

export default function Constant({ value }: ConstantProps) {
	const datatype = typeof value === "boolean"
		? "Boolean"
		: (typeof value === "number" ? "Number" : "String")
	return { type: "injector", tag: "Constant", datatype, value }
}
