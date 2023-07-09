import { NextResponse } from "next/server";

export async function GET() {
    // const post = await fetch("http://graph.facebook.com/v17.0/100063686794660/feed")
    // const post = await fetch("https://graph.facebook.com/oauth/access_token?client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&grant_type=client_credentials  ")
    
    return new NextResponse("s")
}