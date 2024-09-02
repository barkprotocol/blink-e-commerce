import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        apiPath: "/api/actions/*",
        pathPattern: "/*",
      },
    ],
  };

  return new Response(JSON.stringify(payload), {
    status: 200, // Explicitly setting the status code to 200 OK
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;
