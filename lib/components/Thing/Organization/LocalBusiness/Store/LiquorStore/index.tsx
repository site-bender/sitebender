import type BaseProps from "../../../../../../types/index.ts"
import type { LiquorStore as LiquorStoreProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = LiquorStoreProps & BaseProps

export default function LiquorStore({
	_type = "LiquorStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
