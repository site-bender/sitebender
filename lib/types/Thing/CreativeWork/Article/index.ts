import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type SpeakableSpecification from "../../Intangible/SpeakableSpecification/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ArticleProps {
	/** The actual body of the article. */
	articleBody?: Text
	/** Articles may belong to one or more 'sections' in a magazine or newspaper, such as Sports, Lifestyle, etc. */
	articleSection?: Text
	/** For an [[Article]], typically a [[NewsArticle]], the backstory property provides a textual summary giving a brief explanation of why and how an article was created. In a journalistic setting this could include information about reporting process, methods, interviews, data sources, etc. */
	backstory?: Text | CreativeWork
	/** The page on which the work ends; for example "138" or "xvi". */
	pageEnd?: Text | Integer
	/** The page on which the work starts; for example "135" or "xiii". */
	pageStart?: Text | Integer
	/** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55" or "10-12, 46-49". */
	pagination?: Text
	/** Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech.  The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values:  1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned.  2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the [[cssSelector]] property.  3.)  XPaths - addresses content via XPaths (assuming an XML view of the content). Use the [[xpath]] property.   For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, [[SpeakableSpecification]]  which is defined to be a possible value of the *speakable* property. */
	speakable?: SpeakableSpecification | URL
	/** The number of words in the text of the CreativeWork such as an Article, Book, etc. */
	wordCount?: Integer
}

type Article =
	& Thing
	& CreativeWorkProps
	& ArticleProps

export default Article
