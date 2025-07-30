import type BaseProps from "../../../../types/index.ts"
import type MovieProps from "../../../../types/Thing/CreativeWork/Movie/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MovieProps & BaseProps

export default function Movie({
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
	_type = "Movie",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
		>{children}</CreativeWork>
	)
}
