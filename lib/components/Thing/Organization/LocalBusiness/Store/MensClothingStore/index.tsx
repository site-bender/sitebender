import type BaseProps from "../../../../../../types/index.ts"
import type { MensClothingStore as MensClothingStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MensClothingStoreProps & BaseProps

export default function MensClothingStore({
	_type = "MensClothingStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
