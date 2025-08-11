import type BaseProps from "../../../../../types/index.ts"
import type { ReservationPackage as ReservationPackageProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ReservationPackageProps & BaseProps

export default function ReservationPackage({
	_type = "ReservationPackage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
