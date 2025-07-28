import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import AboutPageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/AboutPage/index.tsx"

export interface AboutPageProps {
}

type AboutPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& AboutPageProps

export default AboutPage
