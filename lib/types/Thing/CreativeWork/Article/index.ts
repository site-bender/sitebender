import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWork from "../index.ts"
import type SpeakableSpecification from "../../Intangible/SpeakableSpecification/index.ts"

export interface ArticleProps {
	articleBody?: Text
	articleSection?: Text
	backstory?: CreativeWork | Text
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
	speakable?: SpeakableSpecification | URL
	wordCount?: Integer
}

type Article =
	& Thing
	& CreativeWorkProps
	& ArticleProps

export default Article
