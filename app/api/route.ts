import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

type Data = {
  name: string
}

export async function GET(_: any, res: NextApiResponse<Data>) {
  return NextResponse.json({ name: "John Doe" })
}
