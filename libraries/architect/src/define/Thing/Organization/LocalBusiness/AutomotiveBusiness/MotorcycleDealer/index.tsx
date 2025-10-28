import type BaseProps from "../../../../../../../types/index.ts"
import type { MotorcycleDealer as MotorcycleDealerProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MotorcycleDealerProps & BaseProps

export default function MotorcycleDealer({
	_type = "MotorcycleDealer",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
