import type BaseProps from "../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = HomeAndConstructionBusinessProps & BaseProps

export default function HomeAndConstructionBusiness({
	_type = "HomeAndConstructionBusiness",
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
		/>
	)
}
