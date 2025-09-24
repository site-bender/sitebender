import type BaseProps from "../../../../../../../types/index.ts"
import type { BikeStore as BikeStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BikeStoreProps & BaseProps

export default function BikeStore({
	_type = "BikeStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
