import prisma from "../../../prisma/prisma";

export async function GET() {
  const votes = (await prisma?.vote.findMany()) ?? [];
  return Response.json(votes);
}

export async function POST(request: Request) {
  const {
    julebrusId,
    taste,
    smell,
    color,
  }: { julebrusId: number; taste: number; smell: number; color: number } =
    await request.json();

  const createdVote = await prisma?.vote.create({
    data: {
      julebrusId,
      taste,
      smell,
      color,
    },
  });

  return Response.json(createdVote);
}
