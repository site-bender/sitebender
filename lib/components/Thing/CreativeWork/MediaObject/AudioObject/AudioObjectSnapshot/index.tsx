import type BaseProps from "../../../../../../types/index.ts"
import type AudioObjectSnapshotProps from "../../../../../../types/Thing/CreativeWork/MediaObject/AudioObject/AudioObjectSnapshot/index.ts"

import AudioObject from "../index.tsx"

export type Props = AudioObjectSnapshotProps & BaseProps

export default function AudioObjectSnapshot({
	_type = "AudioObjectSnapshot",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AudioObject
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
