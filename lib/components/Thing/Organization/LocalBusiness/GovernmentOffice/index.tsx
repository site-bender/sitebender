import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GovernmentOfficeProps from "../../../../../types/Thing/GovernmentOffice/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// GovernmentOffice adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	GovernmentOfficeProps,
	"GovernmentOffice",
	ExtractLevelProps<GovernmentOfficeProps, LocalBusinessProps>
>

export default function GovernmentOffice({
	schemaType = "GovernmentOffice",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
