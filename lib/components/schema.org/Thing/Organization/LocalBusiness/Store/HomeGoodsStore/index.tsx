import type BaseProps from "../../../../../../types/index.ts"
import type { HomeGoodsStore as HomeGoodsStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HomeGoodsStoreProps & BaseProps

export default function HomeGoodsStore({
	_type = "HomeGoodsStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
