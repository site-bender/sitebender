import type BaseProps from "../../../../../types/index.ts"
import type MusicVenueProps from "../../../../../types/Thing/Place/CivicStructure/MusicVenue/index.ts"

import CivicStructure from "../index.tsx"

export type Props = MusicVenueProps & BaseProps

export default function MusicVenue({
	_type = "MusicVenue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
