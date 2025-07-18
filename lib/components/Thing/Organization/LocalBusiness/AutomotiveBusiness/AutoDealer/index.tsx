import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutoDealerProps from "../../../../../../types/Thing/AutoDealer/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"

import AutomotiveBusiness from "../index.tsx"

// AutoDealer adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	AutoDealerProps,
	"AutoDealer",
	ExtractLevelProps<AutoDealerProps, AutomotiveBusinessProps>
>

export default function AutoDealer({
	schemaType = "AutoDealer",
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
