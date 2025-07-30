import type BaseProps from "../../../../../types/index.ts"
import type TravelAgencyProps from "../../../../../types/Thing/Organization/LocalBusiness/TravelAgency/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = TravelAgencyProps & BaseProps

export default function TravelAgency({
	_type = "TravelAgency",
	children,
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
		>{children}</LocalBusiness>
	)
}
