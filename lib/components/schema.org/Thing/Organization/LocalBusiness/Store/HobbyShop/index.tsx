import type BaseProps from "../../../../../../types/index.ts"
import type { HobbyShop as HobbyShopProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HobbyShopProps & BaseProps

export default function HobbyShop({
	_type = "HobbyShop",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
