describe('Escenario 1, realizar un login para validar el flujo del sitio', () => {
  let user = 'Carlos Castellanos';
  let password = '1234';
  let user2 = 'Rogelio Menjivar';
  let password2 = '1234';

  let cuentaCarlos = "8745294852"
  let montoEnviarCarlos = "10"
  let cuentaRogelio = "6457562345";
  var guardarSaldoActual = "";

  it('passes', () => {
    cy.viewport(1080, 700);

    cy.visit('http://localhost:8090/');
    cy.wait(2000);
    cy.get('.login-menu > .nav-link').click()
    cy.wait(1000)
    cy.get('#username').type(user);
    cy.get('#password').type(password);
    cy.wait(1000);
    cy.get('#login-button').click();
    cy.wait(2000);
    // validar numero de cuenta
    cy.get(':nth-child(1) > .account-details > .account-element-details > :nth-child(1) > span').contains(cuentaCarlos);
    cy.get(':nth-child(1) > .account-details > .account-element-details > :nth-child(3) > span')
      .then($txt => {
        const txtSaldo = $txt.text();
        guardarSaldoActual = txtSaldo;
      });
    cy.wait(1000);
    cy.get('[href="/transaccion"] > .btn').click();
    //enviar dinero 
    cy.wait(1000)
    cy.get('#cuentaTelefono').type(cuentaRogelio);
    cy.wait(1000)
    cy.get('#correo').type("2527862020@mail.utec.edu.sv");
    cy.wait(1000)
    cy.get('#texto').type("realizando una prueba de transferencia")
    cy.wait(1000)
    cy.get('#monto').type(montoEnviarCarlos);
    cy.wait(1000);
    cy.get('#tipoCuenta').contains("NUMERO DE CUENTA: " + cuentaCarlos + " SALDO: " + guardarSaldoActual);
    cy.wait(2000);
    cy.get('input.btn').click()
    cy.wait(4000);
    cy.get('[href="/movimientos"] > .btn').click();
    //cy.get(':last-child > :first-child')
    cy.get(':last-child  > [data-cy="reference"]').then($txt => {
      cy.log("trx id: " + $txt.text())
    })
    cy.wait(3000);
    cy.get('.username-text').click();
    cy.wait(1000)
    cy.get('[href="/cerrarSesion"] > .dropdown-item').click();
    cy.log("Validar transaccion entrante")
    cy.url().should('include', '/login');
    cy.wait(2000);
    cy.get('.login-menu > .nav-link').click()
    cy.wait(1000)
    cy.get('#username').type(user2);
    cy.get('#password').type(password2);
    cy.wait(1000);
    cy.get('#login-button').click();
    cy.wait(4000);
    cy.get('[href="/movimientos"] > .btn').click();
    cy.get(':last-child  > [data-cy="monto-entrante"]').contains(montoEnviarCarlos).then($txt => {
      cy.log("Monto: " + $txt.text())
    })
    cy.get(':last-child  > [data-cy="reference-entrante"]').then($txt => {
      const referencia = $txt.text();
      const referenciaSinTexto = referencia.replace("Referencia: ", "");
      cy.get('#busqueda-entrante').type(referenciaSinTexto)
    })

  });
});