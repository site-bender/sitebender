import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../types/Thing/AutomotiveBusiness/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// AutomotiveBusiness adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	AutomotiveBusinessProps,
	"AutomotiveBusiness",
	ExtractLevelProps<AutomotiveBusinessProps, LocalBusinessProps>
>

export default function AutomotiveBusiness({
	schemaType = "AutomotiveBusiness",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
