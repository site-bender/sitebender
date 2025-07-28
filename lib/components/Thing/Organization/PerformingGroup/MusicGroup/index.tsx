import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { PerformingGroupProps } from "../../../../../types/Thing/Organization/PerformingGroup/index.ts"
import type { MusicGroupProps } from "../../../../../types/Thing/Organization/PerformingGroup/MusicGroup/index.ts"

import PerformingGroup from "../index.tsx"

export type Props = BaseComponentProps<
	MusicGroupProps,
	"MusicGroup",
	ExtractLevelProps<ThingProps, OrganizationProps, PerformingGroupProps>
>

export default function MusicGroup({
	album,
	albums,
	genre,
	musicGroupMember,
	track,
	tracks,
	schemaType = "MusicGroup",
	subtypeProperties = {},
	...props
}): Props {
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
