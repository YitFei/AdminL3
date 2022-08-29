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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
