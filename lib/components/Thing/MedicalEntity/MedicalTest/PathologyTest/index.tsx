import type BaseProps from "../../../../../types/index.ts"
import type PathologyTestProps from "../../../../../types/Thing/MedicalEntity/MedicalTest/PathologyTest/index.ts"

import MedicalTest from "../index.tsx"

export type Props = PathologyTestProps & BaseProps

export default function PathologyTest({
	tissueSample,
	_type = "PathologyTest",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalTest
			{...props}
			_type={_type}
			subtypeProperties={{
				tissueSample,
				...subtypeProperties,
			}}
		>{children}</MedicalTest>
	)
}
