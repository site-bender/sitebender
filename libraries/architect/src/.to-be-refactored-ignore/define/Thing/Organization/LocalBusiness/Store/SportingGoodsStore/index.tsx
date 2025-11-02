import type BaseProps from "../../../../../../../types/index.ts"
import type { SportingGoodsStore as SportingGoodsStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = SportingGoodsStoreProps & BaseProps

export default function SportingGoodsStore({
	_type = "SportingGoodsStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
