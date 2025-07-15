import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type BioChemEntityProps from "../../../../types/Thing/BioChemEntity/index.ts"
import type ChemicalSubstanceProps from "../../../../types/Thing/ChemicalSubstance/index.ts"

import BioChemEntity from "./index.tsx"

export type Props = BaseComponentProps<
	ChemicalSubstanceProps,
	"ChemicalSubstance",
	ExtractLevelProps<ChemicalSubstanceProps, BioChemEntityProps>
>

export default function ChemicalSubstance(
	{
		chemicalComposition,
		chemicalRole,
		potentialUse,
		schemaType = "ChemicalSubstance",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<BioChemEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				chemicalComposition,
				chemicalRole,
				potentialUse,
				...subtypeProperties,
			}}
		/>
	)
}
