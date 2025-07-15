import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ClipProps from "../../../../../types/Thing/Clip/index.ts"
import type RadioClipProps from "../../../../../types/Thing/RadioClip/index.ts"

import Clip from "./index.tsx"

// RadioClip adds no properties to the Clip schema type
export type Props = BaseComponentProps<
	RadioClipProps,
	"RadioClip",
	ExtractLevelProps<RadioClipProps, ClipProps>
>

export default function RadioClip({
	schemaType = "RadioClip",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Clip
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
