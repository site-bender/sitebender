import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AudioObjectProps from "../../../../../types/Thing/AudioObject/index.ts"
import type MediaObjectProps from "../../../../../types/Thing/MediaObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	AudioObjectProps,
	"AudioObject",
	ExtractLevelProps<AudioObjectProps, MediaObjectProps>
>

export default function AudioObject(
	{
		caption,
		embeddedTextCaption,
		transcript,
		schemaType = "AudioObject",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MediaObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				caption,
				embeddedTextCaption,
				transcript,
				...subtypeProperties,
			}}
		/>
	)
}
