import type BaseProps from "../../../../../types/index.ts"
import type MusicVideoObjectProps from "../../../../../types/Thing/CreativeWork/MediaObject/MusicVideoObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = MusicVideoObjectProps & BaseProps

export default function MusicVideoObject({
	_type = "MusicVideoObject",
	children,
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
		>{children}</MediaObject>
	)
}
