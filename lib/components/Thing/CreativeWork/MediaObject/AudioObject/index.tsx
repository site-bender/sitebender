import type BaseProps from "../../../../../types/index.ts"
import type { AudioObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/AudioObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = AudioObjectProps & BaseProps

export default function AudioObject({
	caption,
	embeddedTextCaption,
	transcript,
	_type = "AudioObject",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaObject
			{...props}
			_type={_type}
			subtypeProperties={{
				caption,
				embeddedTextCaption,
				transcript,
				...subtypeProperties,
			}}
		/>
	)
}
