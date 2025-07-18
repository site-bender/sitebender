import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MovieProps from "../../../../types/Thing/Movie/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MovieProps,
	"Movie",
	ExtractLevelProps<MovieProps, CreativeWorkProps>
>

export default function Movie(
	{
		actor,
		actors,
		countryOfOrigin,
		director,
		directors,
		duration,
		musicBy,
		productionCompany,
		subtitleLanguage,
		titleEIDR,
		trailer,
		schemaType = "Movie",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actor,
				actors,
				countryOfOrigin,
				director,
				directors,
				duration,
				musicBy,
				productionCompany,
				subtitleLanguage,
				titleEIDR,
				trailer,
				...subtypeProperties,
			}}
		/>
	)
}
