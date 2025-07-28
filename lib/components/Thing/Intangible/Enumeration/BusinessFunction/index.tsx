import type BaseProps from "../../../../../types/index.ts"
import type { BusinessFunctionProps } from "../../../../../types/Thing/Intangible/Enumeration/BusinessFunction/index.ts"

import Enumeration from "../index.tsx"

export type Props = BusinessFunctionProps & BaseProps

export default function BusinessFunction({
	_type = "BusinessFunction",
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
