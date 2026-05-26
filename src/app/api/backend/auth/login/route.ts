import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const requestBody = await request.body;
    const baseurl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody,
        duplex: 'half'
    }
    const response = await fetch(`${baseurl}/auth/login`, requestOptions);
    console.log(response);


    if (response.ok) {
        const res = await response.json();
        const {access_token, user} = res.data;
        const cookieStore = await cookies();
        cookieStore.set('adminToken', access_token);
        cookieStore.set('adminUser', JSON.stringify(user));
        return NextResponse.json({code: 0, message: 'OK'});
    } else {
        const json = await response.json();
        return NextResponse.json(json, {status: 422});
    }
}