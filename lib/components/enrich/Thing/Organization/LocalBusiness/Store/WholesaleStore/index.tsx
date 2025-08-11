import type BaseProps from "../../../../../../types/index.ts"
import type { WholesaleStore as WholesaleStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = WholesaleStoreProps & BaseProps

export default function WholesaleStore({
	_type = "WholesaleStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
