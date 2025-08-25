import createElement from "../utilities/createElement/index.ts"

// Simple demo: a form that updates the URL query string on submit via adaptive
export default function Demo() {
  return (
    <body>
      <h1>Adaptive Demo</h1>
      <p>Submitting this form will update the query string to ?k=v</p>
      <form id="demo-form" data-ir-id="evt_form_submit">
        <button type="submit">Submit</button>
      </form>
      {/* Minimal IR script matching the hydrate test */}
      <script id="ir-root" type="application/adaptive+json">{
        JSON.stringify({
          v: "0.1.0",
          kind: "element",
          id: "root",
          tag: "div",
          attrs: {},
          children: [
            {
              v: "0.1.0",
              kind: "on",
              id: "evt_form_submit",
              event: "On.Submit",
              handler: {
                v: "0.1.0",
                kind: "action",
                id: "a1",
                action: "Act.SetQueryString",
                args: [
                  { v: "0.1.0", kind: "injector", id: "k", injector: "From.Constant", datatype: "String", args: { value: "k" } },
                  { v: "0.1.0", kind: "injector", id: "v", injector: "From.Constant", datatype: "String", args: { value: "v" } }
                ]
              }
            }
          ]
        })
      }</script>
      {/* Client-side bootstrap to hydrate */}
      <script dangerouslySetInnerHTML={{ __html: `
        (async () => {
          const [{ createComposeContext }, { registerDefaultExecutors }, hydrate] = await Promise.all([
            import("/@sitebender/adaptive/context/composeContext.ts"),
            import("/@sitebender/adaptive/operations/defaults/registerDefaults.ts"),
            import("/@sitebender/adaptive/runtime/hydrator/index.ts"),
          ]).then(([c, d, h]) => [c, d, h.default])
          const docEl = document.getElementById("ir-root")!
          const ctx = createComposeContext({ env: "client" })
          registerDefaultExecutors(ctx)
          hydrate(JSON.parse(docEl.textContent || "{}"), ctx)
        })().catch(console.error)
      ` }} />
    </body>
  )
}
