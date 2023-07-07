export async function GET() {
    const post = await fetch("http://graph.facebook.com/v17.0/100063686794660/feed")

    console.log(await post.json())
}