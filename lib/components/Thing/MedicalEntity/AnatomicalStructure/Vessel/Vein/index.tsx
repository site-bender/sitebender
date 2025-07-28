import type BaseProps from "../../../../../../types/index.ts"
import type { VeinProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/Vein/index.ts"

import Vessel from "../index.tsx"

export type Props = VeinProps & BaseProps

export default function Vein({
	drainsTo,
	regionDrained,
	tributary,
	_type = "Vein",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Vessel
			{...props}
			_type={_type}
			subtypeProperties={{
				drainsTo,
				regionDrained,
				tributary,
				...subtypeProperties,
			}}
		/>
	)
}
