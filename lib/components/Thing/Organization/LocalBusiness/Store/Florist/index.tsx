import type BaseProps from "../../../../../../types/index.ts"
import type FloristProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/Florist/index.ts"

import Store from "../index.tsx"

export type Props = FloristProps & BaseProps

export default function Florist({
	_type = "Florist",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Store
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
