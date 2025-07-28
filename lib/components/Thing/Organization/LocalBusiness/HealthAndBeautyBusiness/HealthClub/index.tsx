import type BaseProps from "../../../../../../types/index.ts"
import type { HealthClubProps } from "../../../../../../types/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/HealthClub/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = HealthClubProps & BaseProps

export default function HealthClub({
	_type = "HealthClub",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HealthAndBeautyBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
