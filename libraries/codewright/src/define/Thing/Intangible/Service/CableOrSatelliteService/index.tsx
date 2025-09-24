import type BaseProps from "../../../../../../types/index.ts"
import type { CableOrSatelliteService as CableOrSatelliteServiceProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CableOrSatelliteServiceProps & BaseProps

export default function CableOrSatelliteService({
	_type = "CableOrSatelliteService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
