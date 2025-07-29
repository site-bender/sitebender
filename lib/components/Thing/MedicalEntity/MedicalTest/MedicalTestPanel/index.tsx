import type BaseProps from "../../../../../types/index.ts"
import type MedicalTestPanelProps from "../../../../../types/Thing/MedicalEntity/MedicalTest/MedicalTestPanel/index.ts"

import MedicalTest from "../index.tsx"

export type Props = MedicalTestPanelProps & BaseProps

export default function MedicalTestPanel({
	subTest,
	_type = "MedicalTestPanel",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalTest
			{...props}
			_type={_type}
			subtypeProperties={{
				subTest,
				...subtypeProperties,
			}}
		/>
	)
}
