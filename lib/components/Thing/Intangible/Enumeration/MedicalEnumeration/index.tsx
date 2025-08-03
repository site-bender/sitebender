import type BaseProps from "../../../../../types/index.ts"
import type { MedicalEnumeration as MedicalEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MedicalEnumerationProps & BaseProps

export default function MedicalEnumeration({
	_type = "MedicalEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
