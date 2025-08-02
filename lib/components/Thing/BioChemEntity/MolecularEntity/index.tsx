import type BaseProps from "../../../../types/index.ts"
import type MolecularEntityProps from "../../../../types/Thing/BioChemEntity/MolecularEntity/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = MolecularEntityProps & BaseProps

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
	_type = "MolecularEntity",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BioChemEntity
			{...props}
			_type={_type}
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
		>
			{children}
		</BioChemEntity>
	)
}
