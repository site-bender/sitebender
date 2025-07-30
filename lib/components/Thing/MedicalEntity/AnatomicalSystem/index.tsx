import type BaseProps from "../../../../types/index.ts"
import type AnatomicalSystemProps from "../../../../types/Thing/MedicalEntity/AnatomicalSystem/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = AnatomicalSystemProps & BaseProps

export default function AnatomicalSystem({
	associatedPathophysiology,
	comprisedOf,
	relatedCondition,
	relatedStructure,
	relatedTherapy,
	_type = "AnatomicalSystem",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				associatedPathophysiology,
				comprisedOf,
				relatedCondition,
				relatedStructure,
				relatedTherapy,
				...subtypeProperties,
			}}
		>{children}</MedicalEntity>
	)
}
