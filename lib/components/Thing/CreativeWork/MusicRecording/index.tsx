import type BaseProps from "../../../../types/index.ts"
import type { MusicRecordingProps } from "../../../../types/Thing/CreativeWork/MusicRecording/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MusicRecordingProps & BaseProps

export default function MusicRecording({
	byArtist,
	duration,
	inAlbum,
	inPlaylist,
	isrcCode,
	recordingOf,
	_type = "MusicRecording",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				byArtist,
				duration,
				inAlbum,
				inPlaylist,
				isrcCode,
				recordingOf,
				...subtypeProperties,
			}}
		/>
	)
}
