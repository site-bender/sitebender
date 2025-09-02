import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalEnumeration as MedicalEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalEnumerationProps & BaseProps

export default function MedicalEnumeration({
	_type = "MedicalEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
