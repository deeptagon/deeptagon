
import { Section as Component } from "./Section"
import { decorateControlled } from "../../../cypress/support/component"
const Section = decorateControlled(Component)


describe("Section", () => {
  it("should mount", () => {
    cy.mount(<Section />)
  })

  it("can render id", () => {
    cy.mount(<Section id="test-comp" />)

    cy.get("#test-comp")
  })
  it("can render className", () => {
    cy.mount(<Section className="test" />)

    cy.get(".Section.test")
  })
  it("can render name", () => {
    cy.mount(<Section name="test" />)

    cy.get('.Section[name="test"]')
  })
  it("can render title", () => {
    cy.mount(<Section title={"title"}> title </Section>)

    cy.get(".Section .title").should("have.text", "title")
  })
  it("can render children", () => {
    cy.mount(<Section title={"title"}> content </Section>)

    cy.get(".Section .content").should("have.text", " content ")
  })
  it("can change state", () => { // for mobile design
    cy.mount(<Section title={"title"}> content </Section>)
    cy.get(".Section .title").click()
    cy.get(".Section").should("have.class", "active")
  })
})