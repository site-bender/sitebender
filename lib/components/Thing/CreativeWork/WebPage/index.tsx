import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { WebPageProps } from "../../../../types/Thing/CreativeWork/WebPage/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	WebPageProps,
	"WebPage",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function WebPage({
	breadcrumb,
	lastReviewed,
	mainContentOfPage,
	primaryImageOfPage,
	relatedLink,
	reviewedBy,
	significantLink,
	significantLinks,
	speakable,
	specialty,
	schemaType = "WebPage",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				breadcrumb,
				lastReviewed,
				mainContentOfPage,
				primaryImageOfPage,
				relatedLink,
				reviewedBy,
				significantLink,
				significantLinks,
				speakable,
				specialty,
				...subtypeProperties,
			}}
		/>
	)
}
