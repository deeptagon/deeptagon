
import { IconButton } from "./IconButton"

describe("IconButton", () => {

  it("should mount", () => {
    cy.mount(<IconButton />)

  })

  it("can render id", () => {
    cy.mount(<IconButton id="test-comp" />)

    cy.get("#test-comp")
  })
  it("can render className", () => {
    cy.mount(<IconButton className="test" />)

    cy.get(".IconButton.test")
  })
  it("can render icon", () => {
    cy.mount(<IconButton icon="Check" />)

    cy.get(".IconButton")
  })
  it("can render size", () => {
    cy.mount(<IconButton icon="Check" size={100} />)

    cy.get(".IconButton").invoke('height').should("gt", 99).should("lt", 105)
  })
  it("can render alt tooltip", () => {
    cy.mount(<IconButton icon="Check" alt="Test" />)

    cy.get(".IconButton").trigger('mouseover')
    cy.get('[role="tooltip"] > *').should("have.text", 'Test')
  })
})