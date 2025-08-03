import type BaseProps from "../../../../../types/index.ts"
import type { ReturnFeesEnumeration as ReturnFeesEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = ReturnFeesEnumerationProps & BaseProps

export default function ReturnFeesEnumeration({
	_type = "ReturnFeesEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
