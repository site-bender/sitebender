import createElement from "../../utilities/createElement/index.ts"
import { On, SetValue, Constant, FromElement, SetQueryString, If, NotEmpty, Add, ir } from "@sitebender/adaptive/jsx/index.tsx"

export default function Tutorial() {
  // Build IR via JSX components (server-side)
  const program = ir(
    <On id="name" event="On.Input">
      <SetValue>
        <Constant value="#out" />
        <FromElement selector="#name" />
      </SetValue>
    </On>,

    <On id="profile" event="On.Submit">
      <SetQueryString>
        <Constant value="favorite" />
        <FromElement selector="#favorite" />
      </SetQueryString>
    </On>,

    <On id="name" event="On.Blur">
      <If>
        <NotEmpty>
          <FromElement selector="#name" />
        </NotEmpty>
        <SetValue>
          <Constant value="#msg" />
          <Constant value="Looks good." />
        </SetValue>
        <SetValue>
          <Constant value="#msg" />
          <Constant value="Name is required." />
        </SetValue>
      </If>
    </On>,

    <On id="a" event="On.Input">
      <SetValue>
        <Constant value="#sum" />
        <Add>
          <FromElement selector="#a" />
          <FromElement selector="#b" />
        </Add>
      </SetValue>
    </On>,
    <On id="b" event="On.Input">
      <SetValue>
        <Constant value="#sum" />
        <Add>
          <FromElement selector="#a" />
          <FromElement selector="#b" />
        </Add>
      </SetValue>
    </On>,
  )

  return (
    <body>
      <h1>Adaptive Tutorial (JSX)</h1>
      <p>These behaviors are authored with JSX components and hydrated on the client.</p>

      <label for="name">Your name</label>
      <input id="name" data-ir-id="name" />
      <p>Hello, <span id="out">(none)</span></p>

      <form id="profile" data-ir-id="profile" action="/ignored-by-adaptive">
        <input name="favorite" id="favorite" placeholder="Favorite thing" />
        <button type="submit">Save</button>
      </form>

      <p id="msg" aria-live="polite"></p>

      <input id="a" data-ir-id="a" inputmode="numeric" placeholder="A" />
      <input id="b" data-ir-id="b" inputmode="numeric" placeholder="B" />
      = <span id="sum">0</span>

      {/* Embed the IR for client hydration */}
      <script id="ir-root" type="application/adaptive+json">
        {JSON.stringify(program)}
      </script>

  {/* Hydrate using pre-bundled client script */}
  <script type="module" src="/scripts/hydrate/adaptive.js"></script>
    </body>
  )
}
