import type BaseProps from "../../../../../../types/index.ts"
import type PlumberProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/Plumber/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

export type Props = PlumberProps & BaseProps

export default function Plumber({
	_type = "Plumber",
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
		/>
	)
}
