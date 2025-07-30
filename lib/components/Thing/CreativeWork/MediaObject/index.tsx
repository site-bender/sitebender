import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MediaObjectProps from "../../../../types/Thing/MediaObject/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MediaObjectProps,
	"MediaObject",
	ExtractLevelProps<MediaObjectProps, CreativeWorkProps>
>

export default function MediaObject(
	{
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
		_type = "MediaObject",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
		>{children}</MediaObjectProps>
	)
}
