import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import sha1 from "@/lib/sha1";

export async function POST(request: Request) {
    const requestBody = await request.body;
    const baseurl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const timestamp = Date.now();
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const api_secret = process.env.NEXT_PUBLIC_API_SECRET;
    const signature = sha1(`${api_key}${timestamp}${api_secret}`);
    headers.set('x-client-sign', signature);
    headers.set('x-client-timestamp', timestamp.toString());

    const requestOptions = {
        method: 'POST',
        headers: headers,
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