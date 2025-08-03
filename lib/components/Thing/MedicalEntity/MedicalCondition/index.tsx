import type BaseProps from "../../../../types/index.ts"
import type { MedicalCondition as MedicalConditionProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalConditionProps & BaseProps

export default function MedicalCondition({
	_type = "MedicalCondition",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
