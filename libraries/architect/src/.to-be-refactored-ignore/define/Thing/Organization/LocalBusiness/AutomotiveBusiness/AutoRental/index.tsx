import type BaseProps from "../../../../../../../types/index.ts"
import type { AutoRental as AutoRentalProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AutoRentalProps & BaseProps

export default function AutoRental({
	_type = "AutoRental",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
