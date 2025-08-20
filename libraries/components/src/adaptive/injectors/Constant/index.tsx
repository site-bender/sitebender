/**
 * Constant JSX Component
 *
 * Wrapper for the Constant injector constructor.
 * Provides a constant value for calculations and comparisons.
 *
 * @example
 * <Constant value={42} />
 * <Constant value="active" />
 * <Constant value={true} />
 */

import ConstantConstructor from "../../../../adaptive/constructors/injectors/Constant/index.ts"

export type ConstantProps = {
	value: any
}

export default function Constant({
	value,
}: ConstantProps): ReturnType<typeof ConstantConstructor> {
	// Constant constructor signature: (datatype) => (value)
	// Infer datatype from value
	let datatype = "String"
	if (typeof value === "number") datatype = "Number"
	else if (typeof value === "boolean") datatype = "Boolean"
	else if (value instanceof Date) datatype = "Date"
	else if (typeof value === "object") datatype = "Json"

	return ConstantConstructor(datatype)(value)
}
