import type BaseProps from "../../../types/index.ts"
import type MediaObjectProps from "../../../types/Thing/MediaObject/index.ts"

import Thing from "../index.tsx"

export type Props = MediaObjectProps & BaseProps

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
	_type = "MediaObject",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Thing
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
		>{children}</Thing>
	)
}
