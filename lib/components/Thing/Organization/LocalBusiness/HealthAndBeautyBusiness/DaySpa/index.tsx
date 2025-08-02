import type BaseProps from "../../../../../../types/index.ts"
import type DaySpaProps from "../../../../../../types/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/DaySpa/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = DaySpaProps & BaseProps

export default function DaySpa({
	_type = "DaySpa",
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
