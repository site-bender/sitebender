import type BaseProps from "../../../../../types/index.ts"
import type LegalValueLevelProps from "../../../../../types/Thing/Intangible/Enumeration/LegalValueLevel/index.ts"

import Enumeration from "../index.tsx"

export type Props = LegalValueLevelProps & BaseProps

export default function LegalValueLevel({
	_type = "LegalValueLevel",
	children,
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
		>
			{children}
		</Enumeration>
	)
}
