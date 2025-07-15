import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"
import type AutoWashProps from "../../../../../../types/Thing/AutoWash/index.ts"

import AutomotiveBusiness from "./index.tsx"

// AutoWash adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	AutoWashProps,
	"AutoWash",
	ExtractLevelProps<AutoWashProps, AutomotiveBusinessProps>
>

export default function AutoWash({
	schemaType = "AutoWash",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AutomotiveBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
