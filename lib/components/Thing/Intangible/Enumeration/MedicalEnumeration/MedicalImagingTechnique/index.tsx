import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalImagingTechniqueProps } from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalImagingTechniqueProps & BaseProps

export default function MedicalImagingTechnique({
	_type = "MedicalImagingTechnique",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
