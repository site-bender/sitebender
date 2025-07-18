import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AudiobookProps from "../../../../../../types/Thing/Audiobook/index.ts"
import type AudioObjectProps from "../../../../../../types/Thing/AudioObject/index.ts"

import AudioObject from "../index.tsx"

export type Props = BaseComponentProps<
	AudiobookProps,
	"Audiobook",
	ExtractLevelProps<AudiobookProps, AudioObjectProps>
>

export default function Audiobook(
	{
		duration,
		readBy,
		schemaType = "Audiobook",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<AudioObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				duration,
				readBy,
				...subtypeProperties,
			}}
		/>
	)
}
