import type BaseProps from "../../../../../../../types/index.ts"
import type { AutoPartsStore as AutoPartsStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AutoPartsStoreProps & BaseProps

export default function AutoPartsStore({
	_type = "AutoPartsStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
