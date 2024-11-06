export async function POST(request: Request) {
    const data = await request.json();
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken; 

    if (!accessToken) {
        return new Response('Error', {
            status: 400
        });
    }

    const headers = new Headers();
    headers.append('Set-Cookie', `access_token=${accessToken}; Path=/; SameSite=Strict;Secure;HttpOnly; Max-Age=${60 * 60}`); // 15m
    headers.append('Set-Cookie', `refresh_token=${refreshToken}; Path=/; SameSite=Strict;Secure;HttpOnly; Max-Age=${24 * 60 * 60}`); // 1d
    
    return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: headers
    });
}