import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FoodServiceProps from "../../../../../types/Thing/FoodService/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"

import Service from "./index.tsx"

// FoodService adds no properties to the Service schema type
export type Props = BaseComponentProps<
	FoodServiceProps,
	"FoodService",
	ExtractLevelProps<FoodServiceProps, ServiceProps>
>

export default function FoodService({
	schemaType = "FoodService",
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
