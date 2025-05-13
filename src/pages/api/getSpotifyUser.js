export default async function handler(req, res) {
  const { id } = req.query;

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  //get access token
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const { access_token } = await tokenRes.json();

  // fetch user data
  const profileRes = await fetch(`https://api.spotify.com/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!profileRes.ok) {
    return res
      .status(profileRes.status)
      .json({ error: "Failed to fetch user" });
  }

  const profile = await profileRes.json();
  res.status(200).json(profile);
}
