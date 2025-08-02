import type BaseProps from "../../../../../types/index.ts"
import type AmpStoryProps from "../../../../../types/Thing/CreativeWork/MediaObject/AmpStory/index.ts"

import MediaObject from "../index.tsx"

// AmpStory adds no properties to the MediaObject schema type
export type Props = AmpStoryProps & BaseProps

export default function AmpStory({
	_type = "AmpStory",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MediaObject
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</MediaObject>
	)
}
