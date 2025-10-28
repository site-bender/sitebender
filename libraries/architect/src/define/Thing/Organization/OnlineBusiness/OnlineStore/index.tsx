import type BaseProps from "../../../../../../types/index.ts"
import type { OnlineStore as OnlineStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OnlineStoreProps & BaseProps

export default function OnlineStore({
	_type = "OnlineStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
