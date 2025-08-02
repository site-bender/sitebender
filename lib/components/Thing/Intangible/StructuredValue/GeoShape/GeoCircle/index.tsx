import type BaseProps from "../../../../../../types/index.ts"
import type GeoCircleProps from "../../../../../../types/Thing/Intangible/StructuredValue/GeoShape/GeoCircle/index.ts"

import GeoShape from "../index.tsx"

export type Props = GeoCircleProps & BaseProps

export default function GeoCircle({
	geoMidpoint,
	geoRadius,
	_type = "GeoCircle",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<GeoShape
			{...props}
			_type={_type}
			subtypeProperties={{
				geoMidpoint,
				geoRadius,
				...subtypeProperties,
			}}
		>
			{children}
		</GeoShape>
	)
}
