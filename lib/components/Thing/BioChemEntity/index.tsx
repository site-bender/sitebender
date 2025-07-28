import type { BaseComponentProps, ExtractLevelProps } from "../../../types/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"
import type { BioChemEntityProps } from "../../../types/Thing/BioChemEntity/index.ts"

import Thing from "../index.tsx"

export type Props = BaseComponentProps<
	BioChemEntityProps,
	"BioChemEntity",
	ExtractLevelProps<ThingProps>
>

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
	schemaType = "BioChemEntity",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Thing
			{...props}
			schemaType={schemaType}
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
