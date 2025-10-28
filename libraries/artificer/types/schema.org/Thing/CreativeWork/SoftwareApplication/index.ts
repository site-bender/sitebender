import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DataFeed from "../Dataset/DataFeed/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ImageObject from "../MediaObject/ImageObject/index.ts"
import type { MobileApplicationType } from "./MobileApplication/index.ts"
import type { VideoGameType } from "./VideoGame/index.ts"
import type { WebApplicationType } from "./WebApplication/index.ts"

import DataFeedComponent from "../../../../../../architect/src/define/Thing/CreativeWork/Dataset/DataFeed/index.tsx"
import CreativeWorkComponent from "../../../../../../architect/src/define/Thing/CreativeWork/index.tsx"
import ImageObjectComponent from "../../../../../../architect/src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import SoftwareApplicationComponent from "../../../../../../architect/src/define/Thing/CreativeWork/SoftwareApplication/index.tsx"

export type SoftwareApplicationType =
	| "SoftwareApplication"
	| MobileApplicationType
	| VideoGameType
	| WebApplicationType

export interface SoftwareApplicationProps {
	"@type"?: SoftwareApplicationType
	applicationCategory?: Text | URL
	applicationSubCategory?: Text | URL
	applicationSuite?: Text
	availableOnDevice?: Text
	countriesNotSupported?: Text
	countriesSupported?: Text
	device?: Text
	downloadUrl?: URL
	featureList?: Text | URL
	fileSize?: Text
	installUrl?: URL
	memoryRequirements?: Text | URL
	operatingSystem?: Text
	permissions?: Text
	processorRequirements?: Text
	releaseNotes?: Text | URL
	requirements?: Text | URL
	screenshot?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	softwareAddOn?:
		| SoftwareApplication
		| ReturnType<typeof SoftwareApplicationComponent>
	softwareHelp?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	softwareRequirements?: Text | URL
	softwareVersion?: Text
	storageRequirements?: Text | URL
	supportingData?: DataFeed | ReturnType<typeof DataFeedComponent>
}

type SoftwareApplication = Thing & CreativeWorkProps & SoftwareApplicationProps

export default SoftwareApplication
