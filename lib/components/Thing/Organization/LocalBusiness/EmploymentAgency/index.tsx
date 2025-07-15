import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EmploymentAgencyProps from "../../../../../types/Thing/EmploymentAgency/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// EmploymentAgency adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	EmploymentAgencyProps,
	"EmploymentAgency",
	ExtractLevelProps<EmploymentAgencyProps, LocalBusinessProps>
>

export default function EmploymentAgency({
	schemaType = "EmploymentAgency",
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
