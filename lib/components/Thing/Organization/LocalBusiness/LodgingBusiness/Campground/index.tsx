import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CampgroundProps from "../../../../../../types/Thing/Campground/index.ts"
import type LodgingBusinessProps from "../../../../../../types/Thing/LodgingBusiness/index.ts"

import LodgingBusiness from "../index.tsx"

// Campground adds no properties to the LodgingBusiness schema type
export type Props = BaseComponentProps<
	CampgroundProps,
	"Campground",
	ExtractLevelProps<CampgroundProps, LodgingBusinessProps>
>

export default function Campground({
	_type = "Campground",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LodgingBusiness
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		/>
	)
}
