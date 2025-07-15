import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BookFormatTypeProps from "../../../../../types/Thing/BookFormatType/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// BookFormatType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	BookFormatTypeProps,
	"BookFormatType",
	ExtractLevelProps<BookFormatTypeProps, EnumerationProps>
>

export default function BookFormatType({
	schemaType = "BookFormatType",
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
