import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalRiskFactorProps } from "../../../../types/Thing/MedicalEntity/MedicalRiskFactor/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalRiskFactorProps,
	"MedicalRiskFactor",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function MedicalRiskFactor({
	increasesRiskOf,
	schemaType = "MedicalRiskFactor",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				increasesRiskOf,
				...subtypeProperties,
			}}
		/>
	)
}
