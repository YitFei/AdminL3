module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "drive.google.com"],
  },
  env: {
    keycloakUrl: process.env.KEYCLOAK_URL,
    keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
    keycloakRealm: process.env.KEYCLOAK_REALM,
  },
};
