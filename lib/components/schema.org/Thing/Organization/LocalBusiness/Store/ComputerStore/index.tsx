import type BaseProps from "../../../../../../types/index.ts"
import type { ComputerStore as ComputerStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ComputerStoreProps & BaseProps

export default function ComputerStore({
	_type = "ComputerStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
