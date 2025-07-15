import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type RsvpResponseTypeProps from "../../../../../types/Thing/RsvpResponseType/index.ts"

import Enumeration from "./index.tsx"

// RsvpResponseType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	RsvpResponseTypeProps,
	"RsvpResponseType",
	ExtractLevelProps<RsvpResponseTypeProps, EnumerationProps>
>

export default function RsvpResponseType({
	schemaType = "RsvpResponseType",
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
