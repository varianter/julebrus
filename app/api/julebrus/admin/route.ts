import { NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function GET(request: NextRequest) {
  let adminToken: string | null = null;

  try {
    const searchParams = request.nextUrl.searchParams;
    adminToken = searchParams.get("adminToken");
  } catch (e) {
    return new Response("Nuh uh", { status: 403 });
  }

  if (adminToken !== process.env.ADMIN_TOKEN) {
    return new Response("Nuh uh", { status: 403 });
  }

  const julebrus =
    (await prisma?.julebrus.findMany({ include: { ratings: true } })) ?? [];

  return Response.json(julebrus);
}
