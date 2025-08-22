import type BaseProps from "../../../../types/index.ts"
import type { MedicalStudy as MedicalStudyProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalStudyProps & BaseProps

export default function MedicalStudy({
	_type = "MedicalStudy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
