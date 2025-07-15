import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ClipProps from "../../../../../types/Thing/Clip/index.ts"
import type MovieClipProps from "../../../../../types/Thing/MovieClip/index.ts"

import Clip from "./index.tsx"

// MovieClip adds no properties to the Clip schema type
export type Props = BaseComponentProps<
	MovieClipProps,
	"MovieClip",
	ExtractLevelProps<MovieClipProps, ClipProps>
>

export default function MovieClip({
	schemaType = "MovieClip",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Clip
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
