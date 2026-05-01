import { createPlankClient } from "@plank-cms/client";

const plank = createPlankClient({
  url: import.meta.env.PLANK_URL,
  token: import.meta.env.PLANK_TOKEN,
  defaultLocale: "en",
});

export default plank;
