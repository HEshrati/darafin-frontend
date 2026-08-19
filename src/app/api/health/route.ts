export async function GET() {
  return Response.json({
    status: "ok",
    service: "darafin-frontend",
    timestamp: new Date().toISOString(),
  });
}
