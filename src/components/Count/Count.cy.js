import { Count } from "./Count"

describe("Count", () => {
  beforeEach(() => {
  })

  it("can increase value", () => {
    cy.mountControlled(Count)

    cy.get(".Count").find("button").click()
    cy.get(".Count").find(".value").should("have.text", " 1 ")
    cy.get(".Count").find("button:nth-child(3)").click()
    cy.get(".Count").find(".value").should("have.text", " 2 ")
  })
  it("can decrease value", () => {
    cy.mountControlled(Count)


    cy.get(".Count").find("button").click()
    cy.get(".Count").find(".value").should("have.text", " 1 ")
    cy.get(".Count").find("button:nth-child(3)").click()
    cy.get(".Count").find(".value").should("have.text", " 2 ")
    cy.get(".Count").find("button:nth-child(1)").click()
    cy.get(".Count").find(".value").should("have.text", " 1 ")
  })
  it("can render id", () => {
    cy.mountControlled(Count, { id: "test-comp" })

    cy.get("#test-comp")
  })
  it("can render className", () => {
    cy.mountControlled(Count, { className: "test-comp" })


    cy.get(".Count.test-comp")
  })
  it("can render value", () => {
    cy.mountControlled(Count, { value: 5 })

    cy.get(".Count").find(".value").should("have.text", " 5 ")

  })
  it("can render item name", () => {
    cy.mountControlled(Count, { value: 1, name: "item name" })


    cy.get(".Count").find(".IconButton").first().trigger('mouseover')
    cy.get('[role="tooltip"] > *').should("have.text", 'Remove "item name"')

  })
})