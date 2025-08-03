import type BaseProps from "../../../../../../types/index.ts"
import type { VacationRental as VacationRentalProps } from "../../../../../../types/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = VacationRentalProps & BaseProps

export default function VacationRental({
	_type = "VacationRental",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
