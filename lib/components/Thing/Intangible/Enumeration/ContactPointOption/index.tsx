import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ContactPointOptionProps from "../../../../../types/Thing/ContactPointOption/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "../index.tsx"

// ContactPointOption adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	ContactPointOptionProps,
	"ContactPointOption",
	ExtractLevelProps<ContactPointOptionProps, EnumerationProps>
>

export default function ContactPointOption({
	schemaType = "ContactPointOption",
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
