import type BaseProps from "../../../../types/index.ts"
import type WebPageProps from "../../../../types/Thing/CreativeWork/WebPage/index.ts"

import CreativeWork from "../index.tsx"

export type Props = WebPageProps & BaseProps

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
	_type = "WebPage",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
		>{children}</CreativeWork>
	)
}
