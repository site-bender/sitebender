import type BaseProps from "../../../../../types/index.ts"
import type MedicalGuidelineContraindicationProps from "../../../../../types/Thing/MedicalEntity/MedicalGuideline/MedicalGuidelineContraindication/index.ts"

import MedicalGuideline from "../index.tsx"

export type Props = MedicalGuidelineContraindicationProps & BaseProps

export default function MedicalGuidelineContraindication({
	_type = "MedicalGuidelineContraindication",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalGuideline
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalGuideline>
	)
}
