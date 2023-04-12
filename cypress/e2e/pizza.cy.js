import React from "react";
<reference types="cypress" />;

describe("form testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });

  it("inputa metin giriliyor mu", () => {
    cy.get("#name")
      .type("hello")
      .should("have.value", "hello");
  });

  it("ekstra malzemelerden seçim yapılabiliyor mu?", () => {
    cy.get("[type=checkbox] ").check();
  });

  it("form gönderiliyor mu", () => {
    cy.get("[type=radio] ").check();
    cy.get(" #dough-dropdown ").select("thin");
    cy.get("[type=checkbox]").check();
    cy.get("#special-text").type("mantar istemiyorum");
    cy.get("#name").type("hello");
    cy.get("#email").type("hello@hello.com");
    cy.get("#address").type("istanbul");
    cy.get("#order-button").click();
  });
});
