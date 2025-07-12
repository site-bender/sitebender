import type { Integer, Text } from "../../../DataType/index.ts"
import type { SpeakableSpecification, URL } from "../../index.ts"
import type { CreativeWork } from "../index.ts"

// Article interface - extends CreativeWork
// An article, such as a news article or piece of investigative report.
// Newspapers and magazines have articles of many different types and this is intended to cover them all.
export interface Article extends CreativeWork {
	articleBody?: Text
	articleSection?: Text
	backstory?: CreativeWork | Text
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	speakable?: SpeakableSpecification | URL
	wordCount?: Integer
}
