import type BaseProps from "../../../../../types/index.ts"
import type { GameAvailabilityEnumeration as GameAvailabilityEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = GameAvailabilityEnumerationProps & BaseProps

export default function GameAvailabilityEnumeration({
	_type = "GameAvailabilityEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
