import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"
import type TaxiProps from "../../../../../types/Thing/Taxi/index.ts"

import Service from "../index.tsx"

// Taxi adds no properties to the Service schema type
export type Props = BaseComponentProps<
	TaxiProps,
	"Taxi",
	ExtractLevelProps<TaxiProps, ServiceProps>
>

export default function Taxi({
	schemaType = "Taxi",
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
