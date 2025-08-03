import type BaseProps from "../../../../../types/index.ts"
import type { CertificationStatusEnumeration as CertificationStatusEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = CertificationStatusEnumerationProps & BaseProps

export default function CertificationStatusEnumeration({
	_type = "CertificationStatusEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
