import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AttorneyProps from "../../../../../../types/Thing/Attorney/index.ts"
import type LegalServiceProps from "../../../../../../types/Thing/LegalService/index.ts"

import LegalService from "./index.tsx"

// Attorney adds no properties to the LegalService schema type
export type Props = BaseComponentProps<
	AttorneyProps,
	"Attorney",
	ExtractLevelProps<AttorneyProps, LegalServiceProps>
>

export default function Attorney({
	schemaType = "Attorney",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LegalService
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
