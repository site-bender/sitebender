import type BaseProps from "../../../../../types/index.ts"
import type TouristInformationCenterProps from "../../../../../types/Thing/Organization/LocalBusiness/TouristInformationCenter/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = TouristInformationCenterProps & BaseProps

export default function TouristInformationCenter({
	_type = "TouristInformationCenter",
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
		>
			{children}
		</LocalBusiness>
	)
}
