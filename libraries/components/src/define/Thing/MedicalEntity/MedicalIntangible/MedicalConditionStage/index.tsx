import type BaseProps from "../../../../../types/index.ts"
import type { MedicalConditionStage as MedicalConditionStageProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalConditionStageProps & BaseProps

export default function MedicalConditionStage({
	_type = "MedicalConditionStage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
