import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MusicRecordingProps from "../../../../types/Thing/MusicRecording/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	MusicRecordingProps,
	"MusicRecording",
	ExtractLevelProps<MusicRecordingProps, CreativeWorkProps>
>

export default function MusicRecording(
	{
		byArtist,
		duration,
		inAlbum,
		inPlaylist,
		isrcCode,
		recordingOf,
		schemaType = "MusicRecording",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
