import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalIndicationProps from "../../../../../types/Thing/MedicalIndication/index.ts"
import type PreventionIndicationProps from "../../../../../types/Thing/PreventionIndication/index.ts"

import MedicalIndication from "./index.tsx"

// PreventionIndication adds no properties to the MedicalIndication schema type
export type Props = BaseComponentProps<
	PreventionIndicationProps,
	"PreventionIndication",
	ExtractLevelProps<PreventionIndicationProps, MedicalIndicationProps>
>

export default function PreventionIndication({
	schemaType = "PreventionIndication",
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
