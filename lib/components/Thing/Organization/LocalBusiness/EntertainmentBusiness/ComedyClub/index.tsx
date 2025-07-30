import type BaseProps from "../../../../../../types/index.ts"
import type ComedyClubProps from "../../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/ComedyClub/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = ComedyClubProps & BaseProps

export default function ComedyClub({
	_type = "ComedyClub",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<EntertainmentBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</EntertainmentBusiness>
	)
}
