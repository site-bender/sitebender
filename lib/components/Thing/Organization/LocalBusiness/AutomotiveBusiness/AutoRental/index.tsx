import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"
import type AutoRentalProps from "../../../../../../types/Thing/AutoRental/index.ts"

import AutomotiveBusiness from "../index.tsx"

// AutoRental adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	AutoRentalProps,
	"AutoRental",
	ExtractLevelProps<AutoRentalProps, AutomotiveBusinessProps>
>

export default function AutoRental({
	schemaType = "AutoRental",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AutomotiveBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
