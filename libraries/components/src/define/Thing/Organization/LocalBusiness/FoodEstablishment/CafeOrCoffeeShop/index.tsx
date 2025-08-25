import type BaseProps from "../../../../../../../types/index.ts"
import type { CafeOrCoffeeShop as CafeOrCoffeeShopProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CafeOrCoffeeShopProps & BaseProps

export default function CafeOrCoffeeShop({
	_type = "CafeOrCoffeeShop",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
