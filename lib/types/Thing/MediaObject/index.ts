import type Thing from "../index.ts"

export type MediaObjectProps = {
	associatedArticle?: Thing
	bitrate?: string
	contentSize?: string
	contentUrl?: string
	duration?: string
	embedUrl?: string
	encodesCreativeWork?: Thing
	encodingFormat?: string
	endTime?: string
	height?: number
	player?: Thing
	playerType?: string
	production?: Thing
	regions?: Thing
	requiresSubscription?: boolean
	sha256?: string
	startTime?: string
	uploadDate?: string
	width?: number
}

type MediaObject = Thing & MediaObjectProps

export type { MediaObject as default }
