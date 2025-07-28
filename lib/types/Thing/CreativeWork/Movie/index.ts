import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type Person from "../../Person/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"

import MovieComponent from "../../../../../components/Thing/CreativeWork/Movie/index.tsx"

export interface MovieProps {
	actor?: PerformingGroup | Person
	actors?: Person
	countryOfOrigin?: Country
	director?: Person
	directors?: Person
	duration?: Duration | QuantitativeValue
	musicBy?: MusicGroup | Person
	productionCompany?: Organization
	subtitleLanguage?: Language | Text
	titleEIDR?: Text | URL
	trailer?: VideoObject
}

type Movie =
	& Thing
	& CreativeWorkProps
	& MovieProps

export default Movie
