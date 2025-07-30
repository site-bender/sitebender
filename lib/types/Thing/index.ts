import type { Text, URL } from "../DataType/index.ts"
import type Thing from "../index.ts"
import type Action from "./Action/index.ts"
import type CreativeWork from "./CreativeWork/index.ts"
import type ImageObject from "./CreativeWork/MediaObject/ImageObject/index.ts"
import type TextObject from "./CreativeWork/MediaObject/TextObject/index.ts"
import type Event from "./Event/index.ts"
import type PropertyValue from "./Intangible/StructuredValue/PropertyValue/index.ts"

import ActionComponent from "../../components/Thing/Action/index.ts"
import CreativeWorkComponent from "../../components/Thing/CreativeWork/index.ts"
import ImageObjectComponent from "../../components/Thing/CreativeWork/MediaObject/ImageObject/index.ts"
import TextObjectComponent from "../../components/Thing/CreativeWork/MediaObject/TextObject/index.ts"
import EventComponent from "../../components/Thing/Event/index.ts"
import PropertyValueComponent from "../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"

export interface ThingProps {
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
