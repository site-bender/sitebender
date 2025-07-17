import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LegalForceStatusProps from "../../../../../../types/Thing/LegalForceStatus/index.ts"
import type StatusEnumerationProps from "../../../../../../types/Thing/StatusEnumeration/index.ts"

import StatusEnumeration from "../index.tsx"

// LegalForceStatus adds no properties to the StatusEnumeration schema type
export type Props = BaseComponentProps<
	LegalForceStatusProps,
	"LegalForceStatus",
	ExtractLevelProps<LegalForceStatusProps, StatusEnumerationProps>
>

export default function LegalForceStatus({
	schemaType = "LegalForceStatus",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<StatusEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
