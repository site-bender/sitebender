import type BaseProps from "../../../../../types/index.ts"
import type CampingPitchProps from "../../../../../types/Thing/Place/Accommodation/CampingPitch/index.ts"

import Accommodation from "../index.tsx"

export type Props = CampingPitchProps & BaseProps

export default function CampingPitch({
	_type = "CampingPitch",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Accommodation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
