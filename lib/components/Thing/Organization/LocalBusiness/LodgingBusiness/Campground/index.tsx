import type BaseProps from "../../../../../../types/index.ts"
import type CampgroundProps from "../../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/Campground/index.ts"

import LodgingBusiness from "../index.tsx"

// Campground adds no properties to the ListItem schema type
export type Props = CampgroundProps & BaseProps

export default function Campground({
	_type = "Campground",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LodgingBusiness
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</LodgingBusiness>
	)
}
