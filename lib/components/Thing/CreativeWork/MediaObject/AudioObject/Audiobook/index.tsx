import type BaseProps from "../../../../../../types/index.ts"
import type AudiobookProps from "../../../../../../types/Thing/CreativeWork/MediaObject/AudioObject/Audiobook/index.ts"

import AudioObject from "../index.tsx"

// Audiobook adds no properties to the ListItem schema type
export type Props = AudiobookProps & BaseProps

export default function Audiobook(
	{
		duration,
		readBy,
		_type = "Audiobook",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<AudioObject
			{...props}
			_type={_type}
			subtypeProperties={{
				duration,
				readBy,
				...subtypeProperties,
			}}
		>
			{children}
		</AudioObject>
	)
}
