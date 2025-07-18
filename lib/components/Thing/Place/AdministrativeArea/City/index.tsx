import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AdministrativeAreaProps from "../../../../../types/Thing/AdministrativeArea/index.ts"
import type CityProps from "../../../../../types/Thing/City/index.ts"

import AdministrativeArea from "../index.tsx"

// City adds no properties to the AdministrativeArea schema type
export type Props = BaseComponentProps<
	CityProps,
	"City",
	ExtractLevelProps<CityProps, AdministrativeAreaProps>
>

export default function City({
	schemaType = "City",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AdministrativeArea
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
