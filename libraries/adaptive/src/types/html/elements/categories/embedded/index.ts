import type { AudioElement } from "../../embedded/audio/index.ts"
import type { EmbedElement } from "../../embedded/embed/index.ts"
import type { IFrameElement } from "../../embedded/iframe/index.ts"
import type { ImageElement } from "../../embedded/img/index.ts"
import type { ObjectElement } from "../../embedded/object/index.ts"
import type { PictureElement } from "../../embedded/picture/index.ts"
import type { VideoElement } from "../../embedded/video/index.ts"
import type { CanvasElement } from "../../scripting/canvas/index.ts"

// TODO: Add math, svg

export type EmbeddedContent =
	| AudioElement
	| CanvasElement
	| EmbedElement
	| IFrameElement
	| ImageElement
	| ObjectElement
	| PictureElement
	| VideoElement
