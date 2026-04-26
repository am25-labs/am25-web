import { createPlankClient } from "@am25/plank-client";

const plank = createPlankClient({
  url: import.meta.env.PLANK_URL,
  token: import.meta.env.PLANK_TOKEN,
});

export default plank;
