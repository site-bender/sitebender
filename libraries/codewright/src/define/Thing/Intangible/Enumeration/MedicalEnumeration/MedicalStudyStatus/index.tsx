import type BaseProps from "../../../../../../../types/index.ts"
import type { MedicalStudyStatus as MedicalStudyStatusProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalStudyStatusProps & BaseProps

export default function MedicalStudyStatus({
	_type = "MedicalStudyStatus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
