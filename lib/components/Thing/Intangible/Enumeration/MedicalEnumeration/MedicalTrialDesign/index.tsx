import type BaseProps from "../../../../../../types/index.ts"
import type MedicalTrialDesignProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalTrialDesignProps & BaseProps

export default function MedicalTrialDesign({
	_type = "MedicalTrialDesign",
	children,
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
		>{children}</MedicalEnumeration>
	)
}
