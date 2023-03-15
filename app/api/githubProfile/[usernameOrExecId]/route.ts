import { generateGitHubProfile } from "@/defer/generateGitHubProfile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: { usernameOrExecId: string } }
) {
  const res = await generateGitHubProfile(params.usernameOrExecId);
  return NextResponse.json(res);
}

export async function GET(
  _request: Request,
  { params }: { params: { usernameOrExecId: string } }
) {
  return NextResponse.json({});
}
