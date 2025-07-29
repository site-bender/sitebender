import type BaseProps from "../../../../../../types/index.ts"
import type PublicSwimmingPoolProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/PublicSwimmingPool/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = PublicSwimmingPoolProps & BaseProps

export default function PublicSwimmingPool({
	_type = "PublicSwimmingPool",
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
		/>
	)
}
