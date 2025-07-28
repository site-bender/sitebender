import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { ClipProps } from "../../../../../types/Thing/CreativeWork/Clip/index.ts"
import type { TVClipProps } from "../../../../../types/Thing/CreativeWork/Clip/TVClip/index.ts"

import Clip from "../index.tsx"

export type Props = BaseComponentProps<
	TVClipProps,
	"TVClip",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ClipProps>
>

export default function TVClip({
	partOfTVSeries,
	schemaType = "TVClip",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Clip
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				partOfTVSeries,
				...subtypeProperties,
			}}
		/>
	)
}
