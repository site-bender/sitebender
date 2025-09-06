export type SourceNode = {
	type: string
	start: number
	end: number
	children?: Array<SourceNode>
	value?: string
	kind?: string
	name?: string
	left?: SourceNode
	right?: SourceNode
	test?: SourceNode
	consequent?: SourceNode
	alternate?: SourceNode
	cases?: Array<SourceNode>
	block?: SourceNode
	handler?: SourceNode
	operator?: string
}