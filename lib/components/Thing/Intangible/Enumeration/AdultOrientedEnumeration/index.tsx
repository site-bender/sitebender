import type BaseProps from "../../../../../types/index.ts"
import type { AdultOrientedEnumerationProps } from "../../../../../types/Thing/Intangible/Enumeration/AdultOrientedEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = AdultOrientedEnumerationProps & BaseProps

export default function AdultOrientedEnumeration({
	_type = "AdultOrientedEnumeration",
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
