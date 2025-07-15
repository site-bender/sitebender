import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MusicAlbumReleaseTypeProps from "../../../../../types/Thing/MusicAlbumReleaseType/index.ts"

import Enumeration from "./index.tsx"

// MusicAlbumReleaseType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MusicAlbumReleaseTypeProps,
	"MusicAlbumReleaseType",
	ExtractLevelProps<MusicAlbumReleaseTypeProps, EnumerationProps>
>

export default function MusicAlbumReleaseType({
	schemaType = "MusicAlbumReleaseType",
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
