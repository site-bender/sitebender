import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HowToItemProps from "../../../../../../types/Thing/HowToItem/index.ts"
import type HowToSupplyProps from "../../../../../../types/Thing/HowToSupply/index.ts"

import HowToItem from "./index.tsx"

export type Props = BaseComponentProps<
	HowToSupplyProps,
	"HowToSupply",
	ExtractLevelProps<HowToSupplyProps, HowToItemProps>
>

export default function HowToSupply(
	{
		estimatedCost,
		schemaType = "HowToSupply",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<HowToItem
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				estimatedCost,
				...subtypeProperties,
			}}
		/>
	)
}
