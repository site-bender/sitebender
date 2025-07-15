import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"
import type MedicalRiskFactorProps from "../../../../types/Thing/MedicalRiskFactor/index.ts"

import MedicalEntity from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalRiskFactorProps,
	"MedicalRiskFactor",
	ExtractLevelProps<MedicalRiskFactorProps, MedicalEntityProps>
>

export default function MedicalRiskFactor(
	{
		increasesRiskOf,
		schemaType = "MedicalRiskFactor",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
