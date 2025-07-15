import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type VirtualLocationProps from "../../../../types/Thing/VirtualLocation/index.ts"

import Intangible from "./index.tsx"

// VirtualLocation adds no properties to the Intangible schema type
export type Props = BaseComponentProps<
	VirtualLocationProps,
	"VirtualLocation",
	ExtractLevelProps<VirtualLocationProps, IntangibleProps>
>

export default function VirtualLocation({
	schemaType = "VirtualLocation",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
