import { NextResponse } from "next/server"

export async function PATCH(request, { params }) {
    // 동적 경로 변수인 subscriptionId를 가져옵니다.
    const { subscriptionId } = params;

    // API 호출을 위한 URL을 동적으로 생성합니다.
    const apiUrl = `${process.env.PADDLE_API_URL}subscriptions/${subscriptionId}`;

    const requestOptions = {
        method : 'PATCH',
        headers : {"Authorization": `Bearer ${process.env.PADDLE_API_SECRET_KEY}`},
        body : JSON.stringify({
            "scheduled_change": null
          })
    }

    // API를 호출합니다.
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json()

    return new NextResponse(JSON.stringify({result: data}), {
        headers: { "Content-Type": "application/json" },
    })
}