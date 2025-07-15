import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LegalServiceProps from "../../../../../types/Thing/LegalService/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// LegalService adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	LegalServiceProps,
	"LegalService",
	ExtractLevelProps<LegalServiceProps, LocalBusinessProps>
>

export default function LegalService({
	schemaType = "LegalService",
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
