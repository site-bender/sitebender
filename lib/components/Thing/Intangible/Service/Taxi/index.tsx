import type BaseProps from "../../../../../types/index.ts"
import type { Taxi as TaxiProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TaxiProps & BaseProps

export default function Taxi({
	_type = "Taxi",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
