import createElement from "~utilities/createElement/index.ts"
import Fragment from "~utilities/Fragment/index.ts"

// Ensure JSX factory symbols are in scope for TS
void createElement
void Fragment

export type HeadProps = {
  title?: string
  children?: unknown
}

export default function Head({ title, children }: HeadProps) {
  return (
    <>
      {title && <title>{title}</title>}
      {children}
    </>
  )
}
