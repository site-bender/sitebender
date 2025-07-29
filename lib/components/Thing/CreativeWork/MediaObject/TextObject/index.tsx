import type BaseProps from "../../../../../types/index.ts"
import type TextObjectProps from "../../../../../types/Thing/CreativeWork/MediaObject/TextObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = TextObjectProps & BaseProps

export default function TextObject({
	_type = "TextObject",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaObject
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
