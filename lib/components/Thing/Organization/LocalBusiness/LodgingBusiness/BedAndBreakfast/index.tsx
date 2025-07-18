import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BedAndBreakfastProps from "../../../../../../types/Thing/BedAndBreakfast/index.ts"
import type LodgingBusinessProps from "../../../../../../types/Thing/LodgingBusiness/index.ts"

import LodgingBusiness from "../index.tsx"

// BedAndBreakfast adds no properties to the LodgingBusiness schema type
export type Props = BaseComponentProps<
	BedAndBreakfastProps,
	"BedAndBreakfast",
	ExtractLevelProps<BedAndBreakfastProps, LodgingBusinessProps>
>

export default function BedAndBreakfast({
	schemaType = "BedAndBreakfast",
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
