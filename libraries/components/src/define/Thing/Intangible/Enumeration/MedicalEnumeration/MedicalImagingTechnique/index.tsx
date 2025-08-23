import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalImagingTechnique as MedicalImagingTechniqueProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalImagingTechniqueProps & BaseProps

export default function MedicalImagingTechnique({
	_type = "MedicalImagingTechnique",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
