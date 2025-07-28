import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ReservationProps } from "../../../../../types/Thing/Intangible/Reservation/index.ts"
import type { ReservationPackageProps } from "../../../../../types/Thing/Intangible/Reservation/ReservationPackage/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	ReservationPackageProps,
	"ReservationPackage",
	ExtractLevelProps<ThingProps, IntangibleProps, ReservationProps>
>

export default function ReservationPackage({
	subReservation,
	schemaType = "ReservationPackage",
	subtypeProperties = {},
	...props
}): Props {
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
