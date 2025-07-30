import type BaseProps from "../../../../../types/index.ts"
import type HealthAndBeautyBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = HealthAndBeautyBusinessProps & BaseProps

export default function HealthAndBeautyBusiness({
	_type = "HealthAndBeautyBusiness",
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
