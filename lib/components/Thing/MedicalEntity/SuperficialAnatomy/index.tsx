import type BaseProps from "../../../../types/index.ts"
import type SuperficialAnatomyProps from "../../../../types/Thing/MedicalEntity/SuperficialAnatomy/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = SuperficialAnatomyProps & BaseProps

export default function SuperficialAnatomy({
	associatedPathophysiology,
	relatedAnatomy,
	relatedCondition,
	relatedTherapy,
	significance,
	_type = "SuperficialAnatomy",
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
				relatedAnatomy,
				relatedCondition,
				relatedTherapy,
				significance,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalEntity>
	)
}
