import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MediaObjectProps from "../../../../../types/Thing/MediaObject/index.ts"
import type TextObjectProps from "../../../../../types/Thing/TextObject/index.ts"

import MediaObject from "./index.tsx"

// TextObject adds no properties to the MediaObject schema type
export type Props = BaseComponentProps<
	TextObjectProps,
	"TextObject",
	ExtractLevelProps<TextObjectProps, MediaObjectProps>
>

export default function TextObject({
	schemaType = "TextObject",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MediaObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
