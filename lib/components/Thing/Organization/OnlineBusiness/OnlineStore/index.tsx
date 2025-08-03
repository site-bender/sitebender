import type BaseProps from "../../../../../types/index.ts"
import type { OnlineStore as OnlineStoreProps } from "../../../../../types/index.ts"

import OnlineBusiness from "../index.tsx"

export type Props = OnlineStoreProps & BaseProps

export default function OnlineStore({
	_type = "OnlineStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
