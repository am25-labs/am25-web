import { createStrapiClient } from "@itsmrtr/strapi-next-fetch";

const strapi = createStrapiClient({
  url: import.meta.env.STRAPI_API_URL,
  token: import.meta.env.STRAPI_API_TOKEN,
});

export default strapi;
