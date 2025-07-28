import type { BaseComponentProps, ExtractLevelProps } from "../../../types/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"
import type { MediaObjectProps } from "../../../types/Thing/MediaObject/index.ts"

import Thing from "../index.tsx"

export type Props = BaseComponentProps<
	MediaObjectProps,
	"MediaObject",
	ExtractLevelProps<ThingProps>
>

export default function MediaObject({
	associatedArticle,
	bitrate,
	contentSize,
	contentUrl,
	duration,
	embedUrl,
	encodesCreativeWork,
	encodingFormat,
	endTime,
	height,
	ineligibleRegion,
	interpretedAsClaim,
	playerType,
	productionCompany,
	regionsAllowed,
	requiresSubscription,
	sha256,
	startTime,
	uploadDate,
	width,
	schemaType = "MediaObject",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Thing
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedArticle,
				bitrate,
				contentSize,
				contentUrl,
				duration,
				embedUrl,
				encodesCreativeWork,
				encodingFormat,
				endTime,
				height,
				ineligibleRegion,
				interpretedAsClaim,
				playerType,
				productionCompany,
				regionsAllowed,
				requiresSubscription,
				sha256,
				startTime,
				uploadDate,
				width,
				...subtypeProperties,
			}}
		/>
	)
}
