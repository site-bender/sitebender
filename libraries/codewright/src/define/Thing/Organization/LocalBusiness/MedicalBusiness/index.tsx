import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalBusiness as MedicalBusinessProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalBusinessProps & BaseProps

export default function MedicalBusiness({
	_type = "MedicalBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
