import { faker } from "@faker-js/faker";

describe("Registra usuário", () => {
  it("Deve registrar um novo usuario com sucesso", () => {
    cy.registraUsuario({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    }).then((resp) => {
      expect(resp.status).equal(200);
    });
  });

  it("Não deve permitir fazer o registro com body invalido", () => {
    cy.registraUsuario({
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).then((resp) => {
      expect(resp.status).equal(400);
      expect(resp.error).equal("Invalid request body");
    });
  });

  it("Não deve permitir fazer o registro com email invalido", () => {
    cy.registraUsuario({
      email: "leo",
      password: faker.internet.password(),
      name: faker.person.fullName(),
    }).then((resp) => {
      expect(resp.status).equal(400);
      expect(resp.body).equal("Email is not valid");
    });
  });
});
