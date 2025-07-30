import type BaseProps from "../../../../../types/index.ts"
import type ImagingTestProps from "../../../../../types/Thing/MedicalEntity/MedicalTest/ImagingTest/index.ts"

import MedicalTest from "../index.tsx"

export type Props = ImagingTestProps & BaseProps

export default function ImagingTest({
	imagingTechnique,
	_type = "ImagingTest",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalTest
			{...props}
			_type={_type}
			subtypeProperties={{
				imagingTechnique,
				...subtypeProperties,
			}}
		>{children}</MedicalTest>
	)
}
