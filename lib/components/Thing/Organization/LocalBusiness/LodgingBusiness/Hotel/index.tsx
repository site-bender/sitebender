import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HotelProps from "../../../../../../types/Thing/Hotel/index.ts"
import type LodgingBusinessProps from "../../../../../../types/Thing/LodgingBusiness/index.ts"

import LodgingBusiness from "../index.tsx"

// Hotel adds no properties to the LodgingBusiness schema type
export type Props = BaseComponentProps<
	HotelProps,
	"Hotel",
	ExtractLevelProps<HotelProps, LodgingBusinessProps>
>

export default function Hotel({
	schemaType = "Hotel",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LodgingBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
