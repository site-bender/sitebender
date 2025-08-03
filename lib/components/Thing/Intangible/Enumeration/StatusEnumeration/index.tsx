import type BaseProps from "../../../../../types/index.ts"
import type { StatusEnumeration as StatusEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = StatusEnumerationProps & BaseProps

export default function StatusEnumeration({
	_type = "StatusEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
