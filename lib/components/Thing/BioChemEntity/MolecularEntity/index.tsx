import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { BioChemEntityProps } from "../../../../types/Thing/BioChemEntity/index.ts"
import type { MolecularEntityProps } from "../../../../types/Thing/BioChemEntity/MolecularEntity/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = BaseComponentProps<
	MolecularEntityProps,
	"MolecularEntity",
	ExtractLevelProps<ThingProps, BioChemEntityProps>
>

export default function MolecularEntity({
	chemicalRole,
	inChI,
	inChIKey,
	iupacName,
	molecularFormula,
	molecularWeight,
	monoisotopicMolecularWeight,
	potentialUse,
	smiles,
	schemaType = "MolecularEntity",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<BioChemEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				chemicalRole,
				inChI,
				inChIKey,
				iupacName,
				molecularFormula,
				molecularWeight,
				monoisotopicMolecularWeight,
				potentialUse,
				smiles,
				...subtypeProperties,
			}}
		/>
	)
}
