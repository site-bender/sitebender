import type BaseProps from "../../../../types/index.ts"
import type { AnatomicalStructureProps } from "../../../../types/Thing/MedicalEntity/AnatomicalStructure/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = AnatomicalStructureProps & BaseProps

export default function AnatomicalStructure({
	associatedPathophysiology,
	bodyLocation,
	connectedTo,
	diagram,
	partOfSystem,
	relatedCondition,
	relatedTherapy,
	subStructure,
	_type = "AnatomicalStructure",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				associatedPathophysiology,
				bodyLocation,
				connectedTo,
				diagram,
				partOfSystem,
				relatedCondition,
				relatedTherapy,
				subStructure,
				...subtypeProperties,
			}}
		/>
	)
}
