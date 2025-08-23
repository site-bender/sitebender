import type BaseProps from "../../../../../../types/index.ts"
import type { GardenStore as GardenStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = GardenStoreProps & BaseProps

export default function GardenStore({
	_type = "GardenStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
