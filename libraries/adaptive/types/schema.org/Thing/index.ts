import type { Text, URL } from "../DataType/index.ts"
import type Action from "./Action/index.ts"
import type { ActionType } from "./Action/index.ts"
import type { BioChemEntityType } from "./BioChemEntity/index.ts"
import type CreativeWork from "./CreativeWork/index.ts"
import type { CreativeWorkType } from "./CreativeWork/index.ts"
import type ImageObject from "./CreativeWork/MediaObject/ImageObject/index.ts"
import type TextObject from "./CreativeWork/MediaObject/TextObject/index.ts"
import type Event from "./Event/index.ts"
import type { EventType } from "./Event/index.ts"
import type { IntangibleType } from "./Intangible/index.ts"
import type PropertyValue from "./Intangible/StructuredValue/PropertyValue/index.ts"
import type { MediaObjectType } from "./MediaObject/index.ts"
import type { MedicalEntityType } from "./MedicalEntity/index.ts"
import type { OrganizationType } from "./Organization/index.ts"
import type { PersonType } from "./Person/index.ts"
import type { PlaceType } from "./Place/index.ts"
import type { ProductType } from "./Product/index.ts"
import type { TaxonType } from "./Taxon/index.ts"

import { Action as ActionComponent } from "../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../components/index.tsx"
import { Event as EventComponent } from "../../../components/index.tsx"
import { ImageObject as ImageObjectComponent } from "../../../components/index.tsx"
import { PropertyValue as PropertyValueComponent } from "../../../components/index.tsx"
import { TextObject as TextObjectComponent } from "../../../components/index.tsx"

export type ThingType =
	| "Thing"
	| OrganizationType
	| BioChemEntityType
	| PersonType
	| CreativeWorkType
	| MediaObjectType
	| ProductType
	| ActionType
	| TaxonType
	| MedicalEntityType
	| IntangibleType
	| PlaceType
	| EventType

export interface ThingProps {
	"@type"?: ThingType
	additionalType?: Text | URL
	alternateName?: Text
	description?: Text | TextObject | ReturnType<typeof TextObjectComponent>
	disambiguatingDescription?: Text
	identifier?:
		| PropertyValue
		| Text
		| URL
		| ReturnType<typeof PropertyValueComponent>
	image?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	mainEntityOfPage?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	name?: Text
	potentialAction?: Action | ReturnType<typeof ActionComponent>
	sameAs?: URL
	subjectOf?:
		| CreativeWork
		| Event
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof EventComponent>
	url?: URL
}

export default ThingProps
