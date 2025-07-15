import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"
import type TaxiServiceProps from "../../../../../types/Thing/TaxiService/index.ts"

import Service from "./index.tsx"

// TaxiService adds no properties to the Service schema type
export type Props = BaseComponentProps<
	TaxiServiceProps,
	"TaxiService",
	ExtractLevelProps<TaxiServiceProps, ServiceProps>
>

export default function TaxiService({
	schemaType = "TaxiService",
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
