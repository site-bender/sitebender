import type BaseProps from "../../../../../types/index.ts"
import type VesselProps from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = VesselProps & BaseProps

export default function Vessel({
	_type = "Vessel",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AnatomicalStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
