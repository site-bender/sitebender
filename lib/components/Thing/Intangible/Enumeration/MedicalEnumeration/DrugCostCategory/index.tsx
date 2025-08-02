import type BaseProps from "../../../../../../types/index.ts"
import type DrugCostCategoryProps from "../../../../../../types/Thing/Intangible/Enumeration/MedicalEnumeration/DrugCostCategory/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = DrugCostCategoryProps & BaseProps

export default function DrugCostCategory({
	_type = "DrugCostCategory",
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
		>
			{children}
		</MedicalEnumeration>
	)
}
