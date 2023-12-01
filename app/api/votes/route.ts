import prisma from "../../../prisma/prisma";

export async function GET() {
  const votes = (await prisma?.rating.findMany()) ?? [];
  return Response.json(votes);
}

export async function POST(request: Request) {
  const {
    julebrusId,
    taste,
    smell,
    color,
  }: { julebrusId: string; taste: string; smell: string; color: string } =
    await request.json();

  const createdVote = await prisma.rating.create({
    data: {
      julebrusId: parseInt(julebrusId),
      taste: parseInt(taste),
      smell: parseInt(smell),
      color: parseInt(color),
    },
  });

  return Response.json(createdVote);
}
