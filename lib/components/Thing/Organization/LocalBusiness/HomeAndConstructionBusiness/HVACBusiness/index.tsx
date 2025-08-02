import type BaseProps from "../../../../../../types/index.ts"
import type HVACBusinessProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/HVACBusiness/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = HVACBusinessProps & BaseProps

export default function HVACBusiness({
	_type = "HVACBusiness",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HomeAndConstructionBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</HomeAndConstructionBusiness>
	)
}
