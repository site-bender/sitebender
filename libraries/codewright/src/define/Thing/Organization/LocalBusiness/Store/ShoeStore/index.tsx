import type BaseProps from "../../../../../../../types/index.ts"
import type { ShoeStore as ShoeStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ShoeStoreProps & BaseProps

export default function ShoeStore({
	_type = "ShoeStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
