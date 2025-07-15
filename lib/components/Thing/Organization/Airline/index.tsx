import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AirlineProps from "../../../../types/Thing/Airline/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "./index.tsx"

export type Props = BaseComponentProps<
	AirlineProps,
	"Airline",
	ExtractLevelProps<AirlineProps, OrganizationProps>
>

export default function Airline(
	{
		boardingPolicy,
		iataCode,
		schemaType = "Airline",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				boardingPolicy,
				iataCode,
				...subtypeProperties,
			}}
		/>
	)
}
