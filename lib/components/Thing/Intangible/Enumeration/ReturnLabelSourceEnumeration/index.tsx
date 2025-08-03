import type BaseProps from "../../../../../types/index.ts"
import type { ReturnLabelSourceEnumeration as ReturnLabelSourceEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = ReturnLabelSourceEnumerationProps & BaseProps

export default function ReturnLabelSourceEnumeration({
	_type = "ReturnLabelSourceEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
