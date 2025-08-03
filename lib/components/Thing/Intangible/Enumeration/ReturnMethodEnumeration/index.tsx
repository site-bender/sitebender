import type BaseProps from "../../../../../types/index.ts"
import type { ReturnMethodEnumeration as ReturnMethodEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = ReturnMethodEnumerationProps & BaseProps

export default function ReturnMethodEnumeration({
	_type = "ReturnMethodEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
