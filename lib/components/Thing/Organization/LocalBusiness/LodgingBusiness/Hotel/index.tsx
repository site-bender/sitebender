import type BaseProps from "../../../../../../types/index.ts"
import type HotelProps from "../../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/Hotel/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = HotelProps & BaseProps

export default function Hotel({
	_type = "Hotel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LodgingBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</LodgingBusiness>
	)
}
