import type { Text, URL } from "../DataType/index.ts"
import type Action from "./Action/index.ts"
import type CreativeWork from "./CreativeWork/index.ts"
import type Event from "./Event/index.ts"
import type ImageObject from "./CreativeWork/MediaObject/ImageObject/index.ts"
import type PropertyValue from "./Intangible/StructuredValue/PropertyValue/index.ts"
import type TextObject from "./CreativeWork/MediaObject/TextObject/index.ts"

import ThingComponent from "../../../components/Thing/index.tsx"

export interface Thing {
	additionalType?: Text | URL
	alternateName?: Text
	description?: Text | TextObject
	disambiguatingDescription?: Text
	identifier?: PropertyValue | Text | URL
	image?: ImageObject | URL
	mainEntityOfPage?: CreativeWork | URL
	name?: Text
	potentialAction?: Action
	sameAs?: URL
	subjectOf?: CreativeWork | Event
	url?: URL
}

export default Thing
