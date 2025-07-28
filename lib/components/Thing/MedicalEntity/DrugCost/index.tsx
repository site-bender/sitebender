import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { DrugCostProps } from "../../../../types/Thing/MedicalEntity/DrugCost/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	DrugCostProps,
	"DrugCost",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function DrugCost({
	applicableLocation,
	costCategory,
	costCurrency,
	costOrigin,
	costPerUnit,
	drugUnit,
	schemaType = "DrugCost",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				applicableLocation,
				costCategory,
				costCurrency,
				costOrigin,
				costPerUnit,
				drugUnit,
				...subtypeProperties,
			}}
		/>
	)
}
