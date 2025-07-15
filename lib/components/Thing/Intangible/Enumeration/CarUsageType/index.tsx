import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CarUsageTypeProps from "../../../../../types/Thing/CarUsageType/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// CarUsageType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	CarUsageTypeProps,
	"CarUsageType",
	ExtractLevelProps<CarUsageTypeProps, EnumerationProps>
>

export default function CarUsageType({
	schemaType = "CarUsageType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
