import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type SpecialtyProps from "../../../../../types/Thing/Specialty/index.ts"

import Enumeration from "./index.tsx"

// Specialty adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	SpecialtyProps,
	"Specialty",
	ExtractLevelProps<SpecialtyProps, EnumerationProps>
>

export default function Specialty({
	schemaType = "Specialty",
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
