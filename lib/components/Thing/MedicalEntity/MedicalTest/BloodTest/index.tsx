import type BaseProps from "../../../../../types/index.ts"
import type { BloodTestProps } from "../../../../../types/Thing/MedicalEntity/MedicalTest/BloodTest/index.ts"

import MedicalTest from "../index.tsx"

export type Props = BloodTestProps & BaseProps

export default function BloodTest({
	_type = "BloodTest",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalTest
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
