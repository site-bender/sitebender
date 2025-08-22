import type BaseProps from "../../../../../../types/index.ts"
import type { OutletStore as OutletStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = OutletStoreProps & BaseProps

export default function OutletStore({
	_type = "OutletStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
