import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"
import type ReservationPackageProps from "../../../../../types/Thing/ReservationPackage/index.ts"

import Reservation from "./index.tsx"

export type Props = BaseComponentProps<
	ReservationPackageProps,
	"ReservationPackage",
	ExtractLevelProps<ReservationPackageProps, ReservationProps>
>

export default function ReservationPackage(
	{
		subReservation,
		schemaType = "ReservationPackage",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Reservation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				subReservation,
				...subtypeProperties,
			}}
		/>
	)
}
