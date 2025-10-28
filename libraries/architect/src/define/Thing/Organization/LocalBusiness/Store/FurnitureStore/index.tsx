import type BaseProps from "../../../../../../../types/index.ts"
import type { FurnitureStore as FurnitureStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = FurnitureStoreProps & BaseProps

export default function FurnitureStore({
	_type = "FurnitureStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
