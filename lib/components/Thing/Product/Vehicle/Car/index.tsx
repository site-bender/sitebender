import type BaseProps from "../../../../../types/index.ts"
import type CarProps from "../../../../../types/Thing/Product/Vehicle/Car/index.ts"

import Vehicle from "../index.tsx"

export type Props = CarProps & BaseProps

export default function Car({
	acrissCode,
	roofLoad,
	_type = "Car",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Vehicle
			{...props}
			_type={_type}
			subtypeProperties={{
				acrissCode,
				roofLoad,
				...subtypeProperties,
			}}
		>{children}</Vehicle>
	)
}
