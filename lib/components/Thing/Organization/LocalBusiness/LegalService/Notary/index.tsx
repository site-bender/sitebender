import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LegalServiceProps from "../../../../../../types/Thing/LegalService/index.ts"
import type NotaryProps from "../../../../../../types/Thing/Notary/index.ts"

import LegalService from "../index.tsx"

// Notary adds no properties to the LegalService schema type
export type Props = BaseComponentProps<
	NotaryProps,
	"Notary",
	ExtractLevelProps<NotaryProps, LegalServiceProps>
>

export default function Notary({
	schemaType = "Notary",
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
