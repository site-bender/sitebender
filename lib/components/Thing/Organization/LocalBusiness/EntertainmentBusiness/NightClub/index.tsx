import type BaseProps from "../../../../../../types/index.ts"
import type NightClubProps from "../../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/NightClub/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = NightClubProps & BaseProps

export default function NightClub({
	_type = "NightClub",
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
		/>
	)
}
