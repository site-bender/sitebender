import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type MapCategoryTypeProps from "../../../../../types/Thing/MapCategoryType/index.ts"

import Enumeration from "../index.tsx"

// MapCategoryType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	MapCategoryTypeProps,
	"MapCategoryType",
	ExtractLevelProps<MapCategoryTypeProps, EnumerationProps>
>

export default function MapCategoryType({
	schemaType = "MapCategoryType",
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
