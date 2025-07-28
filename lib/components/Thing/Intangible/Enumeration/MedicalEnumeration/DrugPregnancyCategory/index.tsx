import type BaseProps from "../../../../../../types/index.ts"
import type { DrugPregnancyCategoryProps } from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/DrugPregnancyCategory/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = DrugPregnancyCategoryProps & BaseProps

export default function DrugPregnancyCategory({
	_type = "DrugPregnancyCategory",
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
