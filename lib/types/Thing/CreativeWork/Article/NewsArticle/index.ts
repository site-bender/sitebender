import type { Text } from "../../../../DataType/index.ts"
import type Article from "../index.ts"

export default interface NewsArticle extends Article {
	/** A [dateline](https://en.wikipedia.org/wiki/Dateline) is a brief piece of text included in news articles that describes where and when the story was written or filed though the date is often omitted. Sometimes only a placename is provided.  Structured representations of dateline-related information can also be expressed more explicitly using [[locationCreated]] (which represents where a work was created, e.g. where a news report was written).  For location depicted or described in the content, use [[contentLocation]].  Dateline summaries are oriented more towards human readers than towards automated processing, and can vary substantially. Some examples: "BEIRUT, Lebanon, June 2.", "Paris, France", "December 19, 2017 11:43AM Reporting from Washington", "Beijing/Moscow", "QUEZON CITY, Philippines". */
	dateline?: Text
	/** The number of the column in which the NewsArticle appears in the print edition. */
	printColumn?: Text
	/** The edition of the print product in which the NewsArticle appears. */
	printEdition?: Text
	/** If this NewsArticle appears in print, this field indicates the name of the page on which the article is found. Please note that this field is intended for the exact page name (e.g. A5, B18). */
	printPage?: Text
	/** If this NewsArticle appears in print, this field indicates the print section in which the article appeared. */
	printSection?: Text
}
