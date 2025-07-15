import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AdministrativeAreaProps from "../../../../../types/Thing/AdministrativeArea/index.ts"
import type CountryProps from "../../../../../types/Thing/Country/index.ts"

import AdministrativeArea from "./index.tsx"

// Country adds no properties to the AdministrativeArea schema type
export type Props = BaseComponentProps<
	CountryProps,
	"Country",
	ExtractLevelProps<CountryProps, AdministrativeAreaProps>
>

export default function Country({
	schemaType = "Country",
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
