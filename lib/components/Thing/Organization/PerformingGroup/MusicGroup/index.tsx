import type BaseProps from "../../../../../types/index.ts"
import type { MusicGroupProps } from "../../../../../types/Thing/Organization/PerformingGroup/MusicGroup/index.ts"

import PerformingGroup from "../index.tsx"

export type Props = MusicGroupProps & BaseProps

export default function MusicGroup({
	album,
	albums,
	genre,
	musicGroupMember,
	track,
	tracks,
	_type = "MusicGroup",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PerformingGroup
			{...props}
			_type={_type}
			subtypeProperties={{
				album,
				albums,
				genre,
				musicGroupMember,
				track,
				tracks,
				...subtypeProperties,
			}}
		/>
	)
}
