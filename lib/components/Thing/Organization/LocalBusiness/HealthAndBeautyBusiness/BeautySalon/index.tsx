import type BaseProps from "../../../../../../types/index.ts"
import type BeautySalonProps from "../../../../../../types/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/BeautySalon/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = BeautySalonProps & BaseProps

export default function BeautySalon({
	_type = "BeautySalon",
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
