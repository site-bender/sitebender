import type BaseProps from "../../../../../types/index.ts"
import type PhysicalActivityProps from "../../../../../types/Thing/MedicalEntity/LifestyleModification/PhysicalActivity/index.ts"

import LifestyleModification from "../index.tsx"

export type Props = PhysicalActivityProps & BaseProps

export default function PhysicalActivity({
	associatedAnatomy,
	category,
	epidemiology,
	pathophysiology,
	_type = "PhysicalActivity",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LifestyleModification
			{...props}
			_type={_type}
			subtypeProperties={{
				associatedAnatomy,
				category,
				epidemiology,
				pathophysiology,
				...subtypeProperties,
			}}
		/>
	)
}
