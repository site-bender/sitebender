import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { ListItemProps } from "../../../../../../types/Thing/Intangible/ListItem/index.ts"
import type { HowToItemProps } from "../../../../../../types/Thing/Intangible/ListItem/HowToItem/index.ts"
import type { HowToSupplyProps } from "../../../../../../types/Thing/Intangible/ListItem/HowToItem/HowToSupply/index.ts"

import HowToItem from "../index.tsx"

export type Props = BaseComponentProps<
	HowToSupplyProps,
	"HowToSupply",
	ExtractLevelProps<ThingProps, IntangibleProps, ListItemProps, HowToItemProps>
>

export default function HowToSupply({
	estimatedCost,
	schemaType = "HowToSupply",
	subtypeProperties = {},
	...props
}): Props {
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
