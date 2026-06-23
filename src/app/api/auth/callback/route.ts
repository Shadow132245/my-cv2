import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = req.cookies.get("oauth_state")?.value;
  const error = searchParams.get("error");

  if (error || !code || !state || state !== storedState) {
    return NextResponse.redirect(new URL("/?auth_error=access_denied", req.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/?auth_error=server_config", req.url));
  }

  const host = req.headers.get("host") || "localhost:3000";
  const protocol = req.headers.get("x-forwarded-proto") || "https";
  const redirectUri = `${protocol}://${host}/api/auth/callback`;

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Google token exchange error:", errText);
      return NextResponse.redirect(new URL("/?auth_error=token_exchange", req.url));
    }

    const tokens = await tokenRes.json();
    const googleIdToken = tokens.id_token;

    if (!googleIdToken) {
      return NextResponse.redirect(new URL("/?auth_error=no_id_token", req.url));
    }

    const response = NextResponse.redirect(new URL("/?g_token=" + googleIdToken, req.url));
    response.cookies.delete("oauth_state");
    response.cookies.delete("oauth_nonce");
    return response;
  } catch (e) {
    console.error("OAuth callback error:", e);
    return NextResponse.redirect(new URL("/?auth_error=server_error", req.url));
  }
}
