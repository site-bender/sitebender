import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BusinessFunctionProps from "../../../../../types/Thing/BusinessFunction/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// BusinessFunction adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	BusinessFunctionProps,
	"BusinessFunction",
	ExtractLevelProps<BusinessFunctionProps, EnumerationProps>
>

export default function BusinessFunction({
	schemaType = "BusinessFunction",
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
