import type Thing from "../../../index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

import CreativeWorkComponent from "../../../../../components/Thing/CreativeWork/index.ts"

export interface SocialMediaPostingProps {
	sharedContent?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
}

type SocialMediaPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps

export default SocialMediaPosting
