import type BaseProps from "../../../../../../types/index.ts"
import type { HardwareStore as HardwareStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HardwareStoreProps & BaseProps

export default function HardwareStore({
	_type = "HardwareStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
