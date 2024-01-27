import Odoo from "odoo-xmlrpc";

const odoo = new Odoo({
  url: "localhost",
  port: 8069,
  db: "Integraciones",
  username: "admin",
  password: "admin",
});

export const createUser = function ({ nombre, usuario, clave }) {
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push({
      name: nombre,
      login: `${usuario}@zimbra.io`,
      password: clave,
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw("res.users", "create", params, function (err, value) {
      if (err) {
        return console.log(err);
      }
      console.log("User created: " + value);
    });
  });
};

export const deleteUser = function (usuario) {
  odoo.connect(function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Connected to Odoo server.");
    var inParams = [];
    inParams.push([["login", "=", `${usuario}@zimbra.io`]]);
    var params = [];
    params.push(inParams);
    odoo.execute_kw("res.users", "search", params, function (err, value) {
      console.log("Buscado");
      if (err) {
        return console.log(err);
      }
      var userId = value[0];
      console.log("userid", userId);

      odoo.execute_kw("res.users", "unlink", [[userId]], function (err, value) {
        if (err) {
          return console.log(err);
        }
        console.log("User deleted: " + value);
      });
    });
  });
};
