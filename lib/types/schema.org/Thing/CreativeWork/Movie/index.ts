import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../../Organization/index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../Person/index.ts"
import type Country from "../../Place/AdministrativeArea/Country/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type VideoObject from "../MediaObject/VideoObject/index.ts"

import { VideoObject as VideoObjectComponent } from "../../../../../components/index.tsx"
import { Language as LanguageComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { PerformingGroup as PerformingGroupComponent } from "../../../../../components/index.tsx"
import { MusicGroup as MusicGroupComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { Country as CountryComponent } from "../../../../../components/index.tsx"

export type MovieType = "Movie"

export interface MovieProps {
	"@type"?: MovieType
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	countryOfOrigin?: Country | ReturnType<typeof CountryComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	productionCompany?: Organization | ReturnType<typeof OrganizationComponent>
	subtitleLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	titleEIDR?: Text | URL
	trailer?: VideoObject | ReturnType<typeof VideoObjectComponent>
}

type Movie = Thing & CreativeWorkProps & MovieProps

export default Movie
