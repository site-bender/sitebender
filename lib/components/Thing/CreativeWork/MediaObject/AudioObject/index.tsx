import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { MediaObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/index.ts"
import type { AudioObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/AudioObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	AudioObjectProps,
	"AudioObject",
	ExtractLevelProps<ThingProps, CreativeWorkProps, MediaObjectProps>
>

export default function AudioObject({
	caption,
	embeddedTextCaption,
	transcript,
	schemaType = "AudioObject",
	subtypeProperties = {},
	...props
}): Props {
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
