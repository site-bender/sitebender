import type BaseProps from "../../../../../../types/index.ts"
import type LymphaticVesselProps from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/LymphaticVessel/index.ts"

import Vessel from "../index.tsx"

export type Props = LymphaticVesselProps & BaseProps

export default function LymphaticVessel({
	originatesFrom,
	regionDrained,
	runsTo,
	_type = "LymphaticVessel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Vessel
			{...props}
			_type={_type}
			subtypeProperties={{
				originatesFrom,
				regionDrained,
				runsTo,
				...subtypeProperties,
			}}
		>
			{children}
		</Vessel>
	)
}
