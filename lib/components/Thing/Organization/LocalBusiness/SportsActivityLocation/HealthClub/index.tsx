import type BaseProps from "../../../../../../types/index.ts"
import type HealthClubProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/HealthClub/index.ts"

import SportsActivityLocation from "../index.tsx"

// HealthClub adds no properties to the ListItem schema type
export type Props = HealthClubProps & BaseProps

export default function HealthClub({
	_type = "HealthClub",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</SportsActivityLocation>
	)
}
