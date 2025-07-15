import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ChildCareProps from "../../../../../types/Thing/ChildCare/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// ChildCare adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	ChildCareProps,
	"ChildCare",
	ExtractLevelProps<ChildCareProps, LocalBusinessProps>
>

export default function ChildCare({
	schemaType = "ChildCare",
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
