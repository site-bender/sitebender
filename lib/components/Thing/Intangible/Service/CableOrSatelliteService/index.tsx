import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CableOrSatelliteServiceProps from "../../../../../types/Thing/CableOrSatelliteService/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"

import Service from "../index.tsx"

// CableOrSatelliteService adds no properties to the Service schema type
export type Props = BaseComponentProps<
	CableOrSatelliteServiceProps,
	"CableOrSatelliteService",
	ExtractLevelProps<CableOrSatelliteServiceProps, ServiceProps>
>

export default function CableOrSatelliteService({
	schemaType = "CableOrSatelliteService",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Service
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
