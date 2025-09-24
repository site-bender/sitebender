import type BaseProps from "../../../../../../../types/index.ts"
import type { JewelryStore as JewelryStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = JewelryStoreProps & BaseProps

export default function JewelryStore({
	_type = "JewelryStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
