import type BaseProps from "../../../../../types/index.ts"
import type { GeoShapeProps } from "../../../../../types/Thing/Intangible/StructuredValue/GeoShape/index.ts"

import StructuredValue from "../index.tsx"

export type Props = GeoShapeProps & BaseProps

export default function GeoShape({
	address,
	addressCountry,
	box,
	circle,
	elevation,
	line,
	polygon,
	postalCode,
	_type = "GeoShape",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				address,
				addressCountry,
				box,
				circle,
				elevation,
				line,
				polygon,
				postalCode,
				...subtypeProperties,
			}}
		/>
	)
}
