import type BaseProps from "../../../../../../types/index.ts"
import type { Campground as CampgroundProps } from "../../../../../../types/index.ts"

import LodgingBusiness from "../index.tsx"

// Campground adds no properties to the ListItem schema type
export type Props = CampgroundProps & BaseProps

export default function Campground({
	_type = "Campground",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
