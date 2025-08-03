import type BaseProps from "../../../../../types/index.ts"
import type { MedicalObservationalStudy as MedicalObservationalStudyProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MedicalObservationalStudyProps & BaseProps

export default function MedicalObservationalStudy({
	_type = "MedicalObservationalStudy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
