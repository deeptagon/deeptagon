
import { TagSelector as Component } from "./TagSelector"
import { decorateControlled } from "../../../cypress/support/component"
const TagSelector = decorateControlled(Component)

const options = ["Tag 1", "Tag 2", "Tag 3"]
const selectedClass = "selected"

describe("TagSelector", () => {
  it("should mount", () => {
    cy.mount(<TagSelector />)
  })

  it("can render id", () => {
    cy.mount(<TagSelector id="test-comp" />)

    cy.get("#test-comp")
  })
  it("can render className", () => {
    cy.mount(<TagSelector className="test" />)

    cy.get(".TagSelector.test")
  })
  it("can render options", () => {
    cy.mount(<TagSelector options={options} />)

    cy.get(".TagSelector").children().its("length").should("eq", 3)
  })
  it("allows selection by user", () => {
    cy.mount(<TagSelector options={options} />)

    cy.get(".TagSelector").children().first().click().should("have.class", selectedClass)
    cy.get(".TagSelector").children().eq(1).click().should("have.class", selectedClass)
    cy.get(".TagSelector").children().first().should("not.have.class", selectedClass)
  })
  it("allows selection by value", () => {
    cy.mount(<TagSelector options={options} value="Tag 2" />)

    cy.get(".TagSelector").children().first().should("not.have.class", selectedClass)
    cy.get(".TagSelector").children().eq(1).should("have.class", selectedClass)
  })
})