import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EmergencyServiceProps from "../../../../../types/Thing/EmergencyService/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

// EmergencyService adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	EmergencyServiceProps,
	"EmergencyService",
	ExtractLevelProps<EmergencyServiceProps, LocalBusinessProps>
>

export default function EmergencyService({
	schemaType = "EmergencyService",
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
