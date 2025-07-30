import type BaseProps from "../../../../types/index.ts"
import type DrugCostProps from "../../../../types/Thing/MedicalEntity/DrugCost/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = DrugCostProps & BaseProps

export default function DrugCost({
	applicableLocation,
	costCategory,
	costCurrency,
	costOrigin,
	costPerUnit,
	drugUnit,
	_type = "DrugCost",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				applicableLocation,
				costCategory,
				costCurrency,
				costOrigin,
				costPerUnit,
				drugUnit,
				...subtypeProperties,
			}}
		>{children}</MedicalEntity>
	)
}
