import type BaseProps from "../../../../../../types/index.ts"
import type { HowToSupply as HowToSupplyProps } from "../../../../../../types/index.ts"

import HowToItem from "../index.tsx"

export type Props = HowToSupplyProps & BaseProps

export default function HowToSupply({
	_type = "HowToSupply",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
