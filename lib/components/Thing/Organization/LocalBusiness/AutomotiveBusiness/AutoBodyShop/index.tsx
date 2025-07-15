import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutoBodyShopProps from "../../../../../../types/Thing/AutoBodyShop/index.ts"
import type AutomotiveBusinessProps from "../../../../../../types/Thing/AutomotiveBusiness/index.ts"

import AutomotiveBusiness from "./index.tsx"

// AutoBodyShop adds no properties to the AutomotiveBusiness schema type
export type Props = BaseComponentProps<
	AutoBodyShopProps,
	"AutoBodyShop",
	ExtractLevelProps<AutoBodyShopProps, AutomotiveBusinessProps>
>

export default function AutoBodyShop({
	schemaType = "AutoBodyShop",
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
