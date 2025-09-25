/**
 * Constant injector marker
 */

export type ConstantProps = { value: unknown }

export default function Constant({ value }: ConstantProps) {
	const datatype = typeof value === "boolean"
		? "Boolean"
		: (typeof value === "number" ? "Number" : "String")
	return { type: "injector", tag: "Constant", datatype, value }
}
