import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalEvidenceLevel as MedicalEvidenceLevelProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalEvidenceLevelProps & BaseProps

export default function MedicalEvidenceLevel({
	_type = "MedicalEvidenceLevel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
