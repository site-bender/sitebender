import type BaseProps from "../../../../../../../types/index.ts"
import type { AmusementPark as AmusementParkProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AmusementParkProps & BaseProps

export default function AmusementPark({
	_type = "AmusementPark",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
