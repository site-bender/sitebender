import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface NewsArticleProps {
	dateline?: Text
	printColumn?: Text
	printEdition?: Text
	printPage?: Text
	printSection?: Text
}

type NewsArticle = Thing & CreativeWorkProps & ArticleProps & NewsArticleProps

export default NewsArticle
