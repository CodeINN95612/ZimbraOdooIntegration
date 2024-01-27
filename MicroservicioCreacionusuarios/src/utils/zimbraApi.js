import https from "https";

const url = "https://localhost:7071/service/admin/soap";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function makeUser(username, password, token) {
  const data = {
    Header: {
      ctxt: {
        _jsns: "urn:zimbraAdmin",
        authToken: token,
        userAgent: {
          name: "curl",
          version: "7.54.0",
        },
      },
    },
    Body: {
      CreateAccountRequest: {
        _jsns: "urn:zimbraAdmin",
        name: `${username}@zimbra.io`,
        password: password,
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `ZM_ADMIN_AUTH_TOKEN=${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
    redirect: "follow",
    agent: httpsAgent,
  });

  const result = await response.json();
  console.log(result);
}

export async function createUser(username, password) {
  const data = {
    Header: {
      ctxt: {
        _jsns: "urn:zimbraAdmin",
        userAgent: {
          name: "curl",
          version: "7.54.0",
        },
      },
    },
    Body: {
      AuthRequest: {
        _jsns: "urn:zimbraAdmin",
        account: {
          _content: "root",
          by: "name",
        },
        password: "Zimbra2017",
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    agent: httpsAgent,
    credentials: "include",
  });

  const result = await response.json();
  const token = result.Body.AuthResponse.authToken[0]._content;

  await makeUser(username, password, token);
}

async function getIdByName(username, token) {
  const data = {
    Header: {
      ctxt: {
        _jsns: "urn:zimbraAdmin",
        userAgent: {
          name: "curl",
          version: "7.54.0",
        },
      },
    },
    Body: {
      GetAccountInfoRequest: {
        _jsns: "urn:zimbraAdmin",
        account: {
          _content: username,
          by: "name",
        },
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `ZM_ADMIN_AUTH_TOKEN=${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
    redirect: "follow",
    agent: httpsAgent,
  });

  const result = await response.json();
  return result.Body.GetAccountInfoResponse.a[0]._content;
}

async function removeUser(id, token) {
  const data = {
    Header: {
      ctxt: {
        _jsns: "urn:zimbraAdmin",
        userAgent: {
          name: "curl",
          version: "7.54.0",
        },
      },
    },
    Body: {
      DeleteAccountRequest: {
        _jsns: "urn:zimbraAdmin",
        id: id,
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `ZM_ADMIN_AUTH_TOKEN=${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
    agent: httpsAgent,
    redirect: "follow",
  });

  const result = await response.json();
  console.log(result);
}

export async function deleteUser(username) {
  const data = {
    Header: {
      ctxt: {
        _jsns: "urn:zimbraAdmin",
        userAgent: {
          name: "curl",
          version: "7.54.0",
        },
      },
    },
    Body: {
      AuthRequest: {
        _jsns: "urn:zimbraAdmin",
        account: {
          _content: "root",
          by: "name",
        },
        password: "Zimbra2017",
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    agent: httpsAgent,
    credentials: "include",
  });

  const result = await response.json();
  const token = result.Body.AuthResponse.authToken[0]._content;
  const id = await getIdByName(username, token);
  await removeUser(id, token);
}
