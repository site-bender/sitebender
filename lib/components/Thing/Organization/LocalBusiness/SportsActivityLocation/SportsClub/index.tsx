import type BaseProps from "../../../../../../types/index.ts"
import type SportsClubProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/SportsClub/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = SportsClubProps & BaseProps

export default function SportsClub({
	_type = "SportsClub",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SportsActivityLocation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</SportsActivityLocation>
	)
}
