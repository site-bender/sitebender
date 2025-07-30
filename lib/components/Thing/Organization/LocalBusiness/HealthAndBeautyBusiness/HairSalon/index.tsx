import type BaseProps from "../../../../../../types/index.ts"
import type HairSalonProps from "../../../../../../types/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/HairSalon/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = HairSalonProps & BaseProps

export default function HairSalon({
	_type = "HairSalon",
	children,
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
		>{children}</HealthAndBeautyBusiness>
	)
}
