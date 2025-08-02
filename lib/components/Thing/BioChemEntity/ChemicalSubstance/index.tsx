import type BaseProps from "../../../../types/index.ts"
import type ChemicalSubstanceProps from "../../../../types/Thing/BioChemEntity/ChemicalSubstance/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = ChemicalSubstanceProps & BaseProps

export default function ChemicalSubstance({
	chemicalComposition,
	chemicalRole,
	potentialUse,
	_type = "ChemicalSubstance",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BioChemEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				chemicalComposition,
				chemicalRole,
				potentialUse,
				...subtypeProperties,
			}}
		>
			{children}
		</BioChemEntity>
	)
}
