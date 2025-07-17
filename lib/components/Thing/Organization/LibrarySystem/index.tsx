import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type LibrarySystemProps from "../../../../types/Thing/LibrarySystem/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "../index.tsx"

// LibrarySystem adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	LibrarySystemProps,
	"LibrarySystem",
	ExtractLevelProps<LibrarySystemProps, OrganizationProps>
>

export default function LibrarySystem({
	schemaType = "LibrarySystem",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
