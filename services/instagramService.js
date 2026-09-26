async function sendInstagramMessage(
  recipientId,
  text,
  accessToken
) {
  const url = "https://graph.instagram.com/v26.0/me/messages";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: {
        id: recipientId,
      },
      message: {
        text,
      },
    }),
  });

  const data = await response.json();

  console.log("Instagram javobi:", data);

  return data;
}

module.exports = {
  sendInstagramMessage,
};