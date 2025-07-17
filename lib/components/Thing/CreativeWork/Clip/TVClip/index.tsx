import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ClipProps from "../../../../../types/Thing/Clip/index.ts"
import type TVClipProps from "../../../../../types/Thing/TVClip/index.ts"

import Clip from "../index.tsx"

export type Props = BaseComponentProps<
	TVClipProps,
	"TVClip",
	ExtractLevelProps<TVClipProps, ClipProps>
>

export default function TVClip(
	{
		partOfTVSeries,
		schemaType = "TVClip",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
