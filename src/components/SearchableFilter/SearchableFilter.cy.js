
import { SearchableFilter as Component } from "./SearchableFilter"
import { decorateControlled } from "../../../cypress/support/component"
const SearchableFilter = decorateControlled(Component)

const options = [
  { id: 1, name: "Option One", data: "lorem" },
  { id: 2, name: "Option Two", data: "ipsum" },
  { id: 3, name: "Option Three", data: "dolor" }]
const counts = { 1: 2, 2: 6, 3: 9 }
const checkedClass = "Mui-checked"
const selectors = {
  rows: '.SearchableFilter [role="rowgroup"]',
  searchInput: ".MuiTextField-root input"
}
describe("SearchableFilter", () => {
  it("should mount", () => {
    cy.mount(<SearchableFilter />)
  })

  it("can render id", () => {
    cy.mount(<SearchableFilter id="test-comp" />)

    cy.get("#test-comp")
  })
  it("can render className", () => {
    cy.mount(<SearchableFilter className="test" />)

    cy.get(".SearchableFilter.test")
  })
  it("can render options", () => {
    cy.mount(<SearchableFilter options={options} />)

    cy.get(selectors.rows).children().its("length").should("eq", 4)
  })
  it("is all selected", () => {
    cy.mount(<SearchableFilter options={options} />)

    cy.get(selectors.rows)
      .children().first()
      .find(".name").should("have.text", "All")

    cy.get(selectors.rows)
      .children().first()
      .find("input").should("have.attr", "checked")
  })
  it("allows selection", () => {
    cy.mount(<SearchableFilter options={options} />)

    cy.get(selectors.rows)
      .children().eq(2)
      .find(".name").should("have.text", "Option Two")
      .click()

    cy.get(selectors.rows)
      .children().eq(2)
      .find(".MuiCheckbox-root").should("have.class", checkedClass)

    cy.get(selectors.rows)
      .children().first()
      .find(".MuiCheckbox-root").should("not.have.class", checkedClass)
  })
  it("allows multi selection", () => {
    cy.mount(<SearchableFilter options={options} />)

    cy.get(selectors.rows)
      .children().eq(2)
      .find(".name").should("have.text", "Option Two")
      .click()
      .get(selectors.rows)
      .children().eq(3)
      .find(".name").should("have.text", "Option Three")
      .click()

    cy.get(selectors.rows)
      .children().eq(2)
      .find(".MuiCheckbox-root").should("have.class", checkedClass)
      .get(selectors.rows)
      .children().eq(3)
      .find(".MuiCheckbox-root").should("have.class", checkedClass)

    cy.get(selectors.rows)
      .children().first()
      .find(".MuiCheckbox-root").should("not.have.class", checkedClass)
  })
  it("should clean when all selected", () => {
    cy.mount(<SearchableFilter options={options} />)

    cy.get(selectors.rows)
      .children().eq(1)
      .click()
      .get(selectors.rows)
      .children().eq(2)
      .click()
      .get(selectors.rows)
      .children().eq(3)
      .click()

    cy.get(selectors.rows)
      .children().eq(0)
      .find(".MuiCheckbox-root").should("have.class", checkedClass)
      .get(selectors.rows)
      .children().eq(1)
      .find(".MuiCheckbox-root").should("not.have.class", checkedClass)
      .get(selectors.rows)
      .children().eq(2)
      .find(".MuiCheckbox-root").should("not.have.class", checkedClass)
      .get(selectors.rows)
      .children().eq(3)
      .find(".MuiCheckbox-root").should("not.have.class", checkedClass)
  })
  it("should clean when none selected", () => {
    cy.mount(<SearchableFilter options={options} />)

    cy.get(selectors.rows)
      .children().eq(1)
      .click() // check
      .click() // uncheck

    cy.get(selectors.rows)
      .children().eq(0)
      .find(".MuiCheckbox-root").should("have.class", checkedClass)
      .get(selectors.rows)
      .children().eq(1)
      .find(".MuiCheckbox-root").should("not.have.class", checkedClass)
      .get(selectors.rows)
  })
  it("should filter the options", () => {
    cy.mount(<SearchableFilter options={options} />)
    cy.get(selectors.searchInput).type("One")
    cy.get(selectors.rows).children().its("length").should("eq", 2)
  })
  it("should filter the options with fuzzy logic", () => {
    cy.mount(<SearchableFilter options={options} />)

    cy.get(selectors.searchInput).type("Opsion")
    cy.get(selectors.rows).children().its("length").should("eq", 4)
  })
  it("should filter the options by given columns", () => {
    cy.mount(<SearchableFilter options={options} columns={["data", "name"]} />)

    cy.get(selectors.searchInput).type("ipsum")
    cy.get(selectors.rows).children().its("length").should("eq", 2)
  })
  it("should render totalCount", () => {
    cy.mount(<SearchableFilter options={options} totalCount={100} />)

    cy.get(selectors.rows).children().first().find(".count").should("have.text", "(100)")
  })
  it("should render counts correctly", () => {
    cy.mount(<SearchableFilter options={options} />)
    cy.get(selectors.rows).children().eq(0).find(".count").should("have.text", "(0)")
    cy.get(selectors.rows).children().eq(1).find(".count").should("have.text", "(0)")
    cy.get(selectors.rows).children().eq(2).find(".count").should("have.text", "(0)")
    cy.get(selectors.rows).children().eq(3).find(".count").should("have.text", "(0)")
    cy.mount(<SearchableFilter options={options} counts={counts} />)

    cy.get(selectors.rows).children().eq(1).find(".count").should("have.text", "(2)")
    cy.get(selectors.rows).children().eq(2).find(".count").should("have.text", "(6)")
    cy.get(selectors.rows).children().eq(3).find(".count").should("have.text", "(9)")
  })
})