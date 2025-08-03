import type BaseProps from "../../../../../../types/index.ts"
import type { ClothingStore as ClothingStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ClothingStoreProps & BaseProps

export default function ClothingStore({
	_type = "ClothingStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
