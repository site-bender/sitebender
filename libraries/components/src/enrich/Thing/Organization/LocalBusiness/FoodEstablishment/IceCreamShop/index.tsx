import type BaseProps from "../../../../../../types/index.ts"
import type { IceCreamShop as IceCreamShopProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = IceCreamShopProps & BaseProps

export default function IceCreamShop({
	_type = "IceCreamShop",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
