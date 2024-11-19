export default async function handler(req, res) {
  const data = req.body;
  const { email, phone } = data;
  const BrevoResponse = await fetch(
    "https://api.brevo.com/v3/contacts/import",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        listIds: [20], // Change this number to the last number in the url of the list you want (https://app.brevo.com/contact/list/id/20 - The Drop 002 | Pre-sale sign ups #20)
        jsonBody: [
          {
            email: email,
            attributes: { SMS: phone },
          },
        ],
      }),
    }
  );

  res
    .status(BrevoResponse.status)
    .json({ message: "API called", status: BrevoResponse.status });
}
