import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ContinentProps from "../../../../../types/Thing/Continent/index.ts"
import type LandformProps from "../../../../../types/Thing/Landform/index.ts"

import Landform from "../index.tsx"

// Continent adds no properties to the Landform schema type
export type Props = BaseComponentProps<
	ContinentProps,
	"Continent",
	ExtractLevelProps<ContinentProps, LandformProps>
>

export default function Continent({
	schemaType = "Continent",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Landform
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
