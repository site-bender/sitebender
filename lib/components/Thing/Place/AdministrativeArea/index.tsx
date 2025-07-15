import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AdministrativeAreaProps from "../../../../types/Thing/AdministrativeArea/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"

import Place from "./index.tsx"

// AdministrativeArea adds no properties to the Place schema type
export type Props = BaseComponentProps<
	AdministrativeAreaProps,
	"AdministrativeArea",
	ExtractLevelProps<AdministrativeAreaProps, PlaceProps>
>

export default function AdministrativeArea({
	schemaType = "AdministrativeArea",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Place
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
