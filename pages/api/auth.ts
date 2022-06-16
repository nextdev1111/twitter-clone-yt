import { NextRequest, NextResponse } from "next/server";
import supabase from "../../utils/supabase";

export default function handler(req: NextRequest, res: NextResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
