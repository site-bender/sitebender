import type BaseProps from "../../../../../../types/index.ts"
import type { OutletStore as OutletStoreProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = OutletStoreProps & BaseProps

export default function OutletStore({
	_type = "OutletStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
