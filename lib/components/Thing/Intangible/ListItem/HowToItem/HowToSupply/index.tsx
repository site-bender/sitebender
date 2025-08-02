import type BaseProps from "../../../../../../types/index.ts"
import type HowToSupplyProps from "../../../../../../types/Thing/Intangible/ListItem/HowToItem/HowToSupply/index.ts"

import HowToItem from "../index.tsx"

export type Props = HowToSupplyProps & BaseProps

export default function HowToSupply({
	estimatedCost,
	_type = "HowToSupply",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HowToItem
			{...props}
			_type={_type}
			subtypeProperties={{
				estimatedCost,
				...subtypeProperties,
			}}
		>
			{children}
		</HowToItem>
	)
}
