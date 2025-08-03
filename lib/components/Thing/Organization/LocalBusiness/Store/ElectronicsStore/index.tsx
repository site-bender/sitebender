import type BaseProps from "../../../../../../types/index.ts"
import type { ElectronicsStore as ElectronicsStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ElectronicsStoreProps & BaseProps

export default function ElectronicsStore({
	_type = "ElectronicsStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
