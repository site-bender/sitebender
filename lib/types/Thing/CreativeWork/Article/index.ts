import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type SpeakableSpecification from "../../Intangible/SpeakableSpecification/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"
import SpeakableSpecificationComponent from "../../../../components/Thing/Intangible/SpeakableSpecification/index.ts"

export interface ArticleProps {
	"@type"?: "Article"
	articleBody?: Text
	articleSection?: Text
	backstory?: CreativeWork | Text | ReturnType<typeof CreativeWorkComponent>
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
	speakable?:
		| SpeakableSpecification
		| URL
		| ReturnType<typeof SpeakableSpecificationComponent>
	wordCount?: Integer
}

type Article = Thing & CreativeWorkProps & ArticleProps

export default Article
