import type BaseProps from "../../../types/index.ts"
import type BioChemEntityProps from "../../../types/Thing/BioChemEntity/index.ts"

import Thing from "../index.tsx"

export type Props = BioChemEntityProps & BaseProps

export default function BioChemEntity({
	associatedDisease,
	bioChemInteraction,
	bioChemSimilarity,
	biologicalRole,
	funding,
	hasBioChemEntityPart,
	hasMolecularFunction,
	hasRepresentation,
	isEncodedByBioChemEntity,
	isInvolvedInBiologicalProcess,
	isLocatedInSubcellularLocation,
	isPartOfBioChemEntity,
	taxonomicRange,
	_type = "BioChemEntity",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Thing
			{...props}
			_type={_type}
			subtypeProperties={{
				associatedDisease,
				bioChemInteraction,
				bioChemSimilarity,
				biologicalRole,
				funding,
				hasBioChemEntityPart,
				hasMolecularFunction,
				hasRepresentation,
				isEncodedByBioChemEntity,
				isInvolvedInBiologicalProcess,
				isLocatedInSubcellularLocation,
				isPartOfBioChemEntity,
				taxonomicRange,
				...subtypeProperties,
			}}
		/>
	)
}
