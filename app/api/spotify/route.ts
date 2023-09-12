import { redirect } from "next/navigation"
import querystring from "querystring"
import { generateRandomString } from "../helpers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const state = generateRandomString(16)

  const scope = "user-library-read"

  const queryParams = querystring.stringify({
    client_id: "d7a97b41eaff42fe828f8d6841f57ed4",
    response_type: "code",
    redirect_uri: "http://localhost:3000/api/callback",
    state: state,
    scope: scope,
  })

  redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
}
