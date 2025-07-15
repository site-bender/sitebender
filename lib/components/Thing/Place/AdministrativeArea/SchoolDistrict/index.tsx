import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AdministrativeAreaProps from "../../../../../types/Thing/AdministrativeArea/index.ts"
import type SchoolDistrictProps from "../../../../../types/Thing/SchoolDistrict/index.ts"

import AdministrativeArea from "./index.tsx"

// SchoolDistrict adds no properties to the AdministrativeArea schema type
export type Props = BaseComponentProps<
	SchoolDistrictProps,
	"SchoolDistrict",
	ExtractLevelProps<SchoolDistrictProps, AdministrativeAreaProps>
>

export default function SchoolDistrict({
	schemaType = "SchoolDistrict",
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
