import type BaseProps from "../../../../../types/index.ts"
import type RestrictedDietProps from "../../../../../types/Thing/Intangible/Enumeration/RestrictedDiet/index.ts"

import Enumeration from "../index.tsx"

export type Props = RestrictedDietProps & BaseProps

export default function RestrictedDiet({
	_type = "RestrictedDiet",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
