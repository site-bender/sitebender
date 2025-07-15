import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FundingAgencyProps from "../../../../../types/Thing/FundingAgency/index.ts"
import type ProjectProps from "../../../../../types/Thing/Project/index.ts"

import Project from "./index.tsx"

// FundingAgency adds no properties to the Project schema type
export type Props = BaseComponentProps<
	FundingAgencyProps,
	"FundingAgency",
	ExtractLevelProps<FundingAgencyProps, ProjectProps>
>

export default function FundingAgency({
	schemaType = "FundingAgency",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Project
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
