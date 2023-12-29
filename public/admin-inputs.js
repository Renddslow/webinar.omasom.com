class AdminInputs extends HTMLElement {
  shadowRoot;
  _internals;
  static formAssociated = true;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open", delegatesFocus: true });
    this._internals = this.attachInternals();
    this.handleInput = this.handleInput.bind(this);
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
    const input = this.shadowRoot.querySelector("input");
    this._internals.setValidity(input.validity, input.validationMessage, input);
    this._internals.setFormValue(input.value);
    this.render();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  handleInput(e) {
    const value = e.target.value;
    this._internals.setFormValue(value);
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

    input.addEventListener("keydown", this.handleInput);
  }
}

(() => {
  customElements.define("admin-form-input", AdminInputs);
})();
