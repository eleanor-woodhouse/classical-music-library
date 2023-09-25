import { redirect } from "next/navigation"
import querystring from "querystring"
import { generateRandomString } from "../helpers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const state = generateRandomString(16)

  const scope = "user-library-read"

  const queryParams = querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: "http://localhost:3000/api/callback",
    state: state,
    scope: scope,
  })

  redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
}
