import type BaseProps from "../../../../../../../types/index.ts"
import type { LiquorStore as LiquorStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = LiquorStoreProps & BaseProps

export default function LiquorStore({
	_type = "LiquorStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
