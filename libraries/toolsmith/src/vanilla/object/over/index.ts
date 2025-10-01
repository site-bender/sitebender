import type { Lens } from "../lens/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const over = <S, A>(
	lens: Lens<S, A>,
) =>
(
	fn: (value: A) => A,
) =>
(
	obj: S,
): S => {
	// Get the current value through the lens
	const currentValue = lens.get(obj)

	// Apply the transformation
	const newValue = fn(currentValue)

	// Set the new value through the lens
	return lens.set(newValue)(obj)
}

export default over
