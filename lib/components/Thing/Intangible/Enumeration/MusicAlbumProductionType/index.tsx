import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MusicAlbumProductionTypeProps from "../../../../../types/Thing/MusicAlbumProductionType/index.ts"

import Enumeration from "./index.tsx"

// MusicAlbumProductionType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MusicAlbumProductionTypeProps,
	"MusicAlbumProductionType",
	ExtractLevelProps<MusicAlbumProductionTypeProps, EnumerationProps>
>

export default function MusicAlbumProductionType({
	schemaType = "MusicAlbumProductionType",
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
