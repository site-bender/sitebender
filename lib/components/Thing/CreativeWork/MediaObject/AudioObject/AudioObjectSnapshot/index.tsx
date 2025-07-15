import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AudioObjectProps from "../../../../../../types/Thing/AudioObject/index.ts"
import type AudioObjectSnapshotProps from "../../../../../../types/Thing/AudioObjectSnapshot/index.ts"

import AudioObject from "./index.tsx"

// AudioObjectSnapshot adds no properties to the AudioObject schema type
export type Props = BaseComponentProps<
	AudioObjectSnapshotProps,
	"AudioObjectSnapshot",
	ExtractLevelProps<AudioObjectSnapshotProps, AudioObjectProps>
>

export default function AudioObjectSnapshot({
	schemaType = "AudioObjectSnapshot",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AudioObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
