import type BaseProps from "../../../../../../types/index.ts"
import type ElectricianProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/Electrician/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = ElectricianProps & BaseProps

export default function Electrician({
	_type = "Electrician",
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
		>{children}</HomeAndConstructionBusiness>
	)
}
