import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MusicGroupProps from "../../../../../types/Thing/MusicGroup/index.ts"
import type PerformingGroupProps from "../../../../../types/Thing/PerformingGroup/index.ts"

import PerformingGroup from "../index.tsx"

export type Props = BaseComponentProps<
	MusicGroupProps,
	"MusicGroup",
	ExtractLevelProps<MusicGroupProps, PerformingGroupProps>
>

export default function MusicGroup(
	{
		album,
		albums,
		genre,
		musicGroupMember,
		track,
		tracks,
		schemaType = "MusicGroup",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<PerformingGroup
			{...props}
			schemaType={schemaType}
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
