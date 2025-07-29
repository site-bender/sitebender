import type BaseProps from "../../../../../types/index.ts"
import type CableOrSatelliteServiceProps from "../../../../../types/Thing/Intangible/Service/CableOrSatelliteService/index.ts"

import Service from "../index.tsx"

export type Props = CableOrSatelliteServiceProps & BaseProps

export default function CableOrSatelliteService({
	_type = "CableOrSatelliteService",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
