import type BaseProps from "../../../../../types/index.ts"
import type GameAvailabilityEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/GameAvailabilityEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = GameAvailabilityEnumerationProps & BaseProps

export default function GameAvailabilityEnumeration({
	_type = "GameAvailabilityEnumeration",
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
