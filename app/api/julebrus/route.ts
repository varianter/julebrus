import prisma from "../../../prisma/prisma";

export async function GET() {
  const julebrus =
    (await prisma?.julebrus.findMany({ select: { id: true } })) ?? [];

  return Response.json(julebrus);
}
