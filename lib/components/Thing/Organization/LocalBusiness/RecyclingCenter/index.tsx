import type BaseProps from "../../../../../types/index.ts"
import type RecyclingCenterProps from "../../../../../types/Thing/Organization/LocalBusiness/RecyclingCenter/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = RecyclingCenterProps & BaseProps

export default function RecyclingCenter({
	_type = "RecyclingCenter",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
