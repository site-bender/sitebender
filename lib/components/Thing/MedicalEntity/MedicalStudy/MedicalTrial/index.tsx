import type BaseProps from "../../../../../types/index.ts"
import type MedicalTrialProps from "../../../../../types/Thing/MedicalEntity/MedicalStudy/MedicalTrial/index.ts"

import MedicalStudy from "../index.tsx"

export type Props = MedicalTrialProps & BaseProps

export default function MedicalTrial({
	trialDesign,
	_type = "MedicalTrial",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalStudy
			{...props}
			_type={_type}
			subtypeProperties={{
				trialDesign,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalStudy>
	)
}
