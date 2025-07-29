import type BaseProps from "../../../../../types/index.ts"
import type JointProps from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Joint/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = JointProps & BaseProps

export default function Joint({
	biomechnicalClass,
	functionalClass,
	structuralClass,
	_type = "Joint",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AnatomicalStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				biomechnicalClass,
				functionalClass,
				structuralClass,
				...subtypeProperties,
			}}
		/>
	)
}
