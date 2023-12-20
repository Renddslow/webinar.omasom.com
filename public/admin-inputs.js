const css = (s) => {
  const sheet = new CSSStyleSheet();
  s.map((rule) => rule.split("\n\n"))
    .flat()
    .forEach((rule) => sheet.insertRule(rule));
  return sheet;
};

class AdminInputs extends HTMLElement {
  shadowRoot;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.render = this.render.bind(this);
    this.shadowRoot.adoptedStyleSheets.push(css`
      * {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        padding: 0;
        margin: 0;
      }

      .form-control {
        display: grid;
        grid-template-columns: minmax(0, 150px) 1fr;
        grid-gap: 42px;
        align-items: start;
      }

      .form-control .label {
        display: grid;
        grid-gap: 12px;
        width: 100%;
      }

      .label label {
        font-weight: 700;
        font-size: 14px;
      }

      .label p {
        font-weight: 400;
        font-size: 12px;
        color: #a1a6b2;
      }

      .form-control input,
      .form-control textarea {
        padding: 12px;
        border-radius: 4px;
        border: 1px solid #8e9094;
        background: #fdfdfd;
        font-size: 16px;
      }
    `);
    this.shadowRoot.innerHTML = `
        <div class="form-control">
            <div class="label">
                <label></label>
                <p></p>
            </div>
            <input type="text" name="" />
        </div>
    `;
  }

  async connectedCallback() {
    this.render();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const label = this.getAttribute("label");
    const labelEl = this.shadowRoot.querySelector("label");
    labelEl.innerText = label;
    labelEl.htmlFor = label.toLowerCase().replace(" ", "-");

    const type = this.getAttribute("type");
    const input =
      type === "textarea"
        ? document.createElement("textarea")
        : this.shadowRoot.querySelector("input");
    if (type === "textarea") {
      input.rows = 6;
      this.shadowRoot
        .querySelector(".form-control")
        .insertBefore(input, this.shadowRoot.querySelector("input"));
      this.shadowRoot.querySelector("input").remove();
    }
    input.name = labelEl.htmlFor;
    input.id = labelEl.htmlFor;
    input.value = this.getAttribute("value");

    const helptext = this.getAttribute("helptext");
    const helptextEl = this.shadowRoot.querySelector(".label p");
    helptextEl.innerText = helptext;
  }
}

(() => {
  customElements.define("admin-form-input", AdminInputs);
})();
