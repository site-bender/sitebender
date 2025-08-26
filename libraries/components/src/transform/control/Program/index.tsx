import compileToAdaptive from "../../compile/toAdaptiveIr.ts"

export type Props = {
  id?: string // script element id
  type?: string // MIME type
  children?: JSX.Element | Array<JSX.Element>
}

export default function Program({ id = "ir-root", type = "application/adaptive+json", children }: Props) {
  const ir = compileToAdaptive(children as unknown)
  return {
    type: "script",
    props: {
      id,
      type,
      children: JSON.stringify(ir),
    },
  }
}
