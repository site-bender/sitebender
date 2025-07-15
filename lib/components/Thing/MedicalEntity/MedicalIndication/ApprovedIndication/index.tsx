import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ApprovedIndicationProps from "../../../../../types/Thing/ApprovedIndication/index.ts"
import type MedicalIndicationProps from "../../../../../types/Thing/MedicalIndication/index.ts"

import MedicalIndication from "./index.tsx"

// ApprovedIndication adds no properties to the MedicalIndication schema type
export type Props = BaseComponentProps<
	ApprovedIndicationProps,
	"ApprovedIndication",
	ExtractLevelProps<ApprovedIndicationProps, MedicalIndicationProps>
>

export default function ApprovedIndication({
	schemaType = "ApprovedIndication",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalIndication
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
