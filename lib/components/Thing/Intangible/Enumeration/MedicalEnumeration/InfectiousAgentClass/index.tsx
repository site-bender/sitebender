import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type InfectiousAgentClassProps from "../../../../../../types/Thing/InfectiousAgentClass/index.ts"
import type MedicalEnumerationProps from "../../../../../../types/Thing/MedicalEnumeration/index.ts"

import MedicalEnumeration from "../index.tsx"

// InfectiousAgentClass adds no properties to the MedicalEnumeration schema type
export type Props = BaseComponentProps<
	InfectiousAgentClassProps,
	"InfectiousAgentClass",
	ExtractLevelProps<InfectiousAgentClassProps, MedicalEnumerationProps>
>

export default function InfectiousAgentClass({
	schemaType = "InfectiousAgentClass",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
