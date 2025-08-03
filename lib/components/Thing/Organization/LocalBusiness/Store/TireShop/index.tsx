import type BaseProps from "../../../../../../types/index.ts"
import type { TireShop as TireShopProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = TireShopProps & BaseProps

export default function TireShop({
	_type = "TireShop",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
