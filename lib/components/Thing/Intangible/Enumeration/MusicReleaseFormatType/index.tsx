import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MusicReleaseFormatTypeProps from "../../../../../types/Thing/MusicReleaseFormatType/index.ts"

import Enumeration from "./index.tsx"

// MusicReleaseFormatType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MusicReleaseFormatTypeProps,
	"MusicReleaseFormatType",
	ExtractLevelProps<MusicReleaseFormatTypeProps, EnumerationProps>
>

export default function MusicReleaseFormatType({
	schemaType = "MusicReleaseFormatType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
