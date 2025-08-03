import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalObservationalStudyDesign as MedicalObservationalStudyDesignProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalObservationalStudyDesignProps & BaseProps

export default function MedicalObservationalStudyDesign({
	_type = "MedicalObservationalStudyDesign",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
