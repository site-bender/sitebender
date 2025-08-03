import type BaseProps from "../../../../../types/index.ts"
import type { SizeGroupEnumeration as SizeGroupEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = SizeGroupEnumerationProps & BaseProps

export default function SizeGroupEnumeration({
	_type = "SizeGroupEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
