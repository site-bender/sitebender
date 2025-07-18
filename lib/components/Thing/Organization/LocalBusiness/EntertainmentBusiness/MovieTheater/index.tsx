import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EntertainmentBusinessProps from "../../../../../../types/Thing/EntertainmentBusiness/index.ts"
import type MovieTheaterProps from "../../../../../../types/Thing/MovieTheater/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = BaseComponentProps<
	MovieTheaterProps,
	"MovieTheater",
	ExtractLevelProps<MovieTheaterProps, EntertainmentBusinessProps>
>

export default function MovieTheater(
	{
		screenCount,
		schemaType = "MovieTheater",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<EntertainmentBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				screenCount,
				...subtypeProperties,
			}}
		/>
	)
}
