import type BaseProps from "../../../../../../types/index.ts"
import type StadiumOrArenaProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/StadiumOrArena/index.ts"

import SportsActivityLocation from "../index.tsx"

// StadiumOrArena adds no properties to the ListItem schema type
export type Props = StadiumOrArenaProps & BaseProps

export default function StadiumOrArena({
	_type = "StadiumOrArena",
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
