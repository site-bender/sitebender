import type BaseProps from "../../../../../../types/index.ts"
import type NailSalonProps from "../../../../../../types/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/NailSalon/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = NailSalonProps & BaseProps

export default function NailSalon({
	_type = "NailSalon",
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
		>
			{children}
		</HealthAndBeautyBusiness>
	)
}
