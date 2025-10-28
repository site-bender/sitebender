import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export type AboutPageType = "AboutPage"

export interface AboutPageProps {
	"@type"?: AboutPageType
}

type AboutPage = Thing & CreativeWorkProps & WebPageProps & AboutPageProps

export default AboutPage
