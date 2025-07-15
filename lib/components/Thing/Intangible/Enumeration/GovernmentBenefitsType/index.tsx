import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type GovernmentBenefitsTypeProps from "../../../../../types/Thing/GovernmentBenefitsType/index.ts"

import Enumeration from "./index.tsx"

// GovernmentBenefitsType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	GovernmentBenefitsTypeProps,
	"GovernmentBenefitsType",
	ExtractLevelProps<GovernmentBenefitsTypeProps, EnumerationProps>
>

export default function GovernmentBenefitsType({
	schemaType = "GovernmentBenefitsType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
