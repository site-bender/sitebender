import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type VideoObjectProps from "../../../../../../types/Thing/VideoObject/index.ts"
import type VideoObjectSnapshotProps from "../../../../../../types/Thing/VideoObjectSnapshot/index.ts"

import VideoObject from "./index.tsx"

// VideoObjectSnapshot adds no properties to the VideoObject schema type
export type Props = BaseComponentProps<
	VideoObjectSnapshotProps,
	"VideoObjectSnapshot",
	ExtractLevelProps<VideoObjectSnapshotProps, VideoObjectProps>
>

export default function VideoObjectSnapshot({
	schemaType = "VideoObjectSnapshot",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<VideoObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
