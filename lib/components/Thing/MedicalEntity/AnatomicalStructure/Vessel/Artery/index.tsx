import type BaseProps from "../../../../../../types/index.ts"
import type ArteryProps from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/Artery/index.ts"

import Vessel from "../index.tsx"

export type Props = ArteryProps & BaseProps

export default function Artery({
	arterialBranch,
	supplyTo,
	_type = "Artery",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Vessel
			{...props}
			_type={_type}
			subtypeProperties={{
				arterialBranch,
				supplyTo,
				...subtypeProperties,
			}}
		/>
	)
}
