import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    // 동적 경로 변수인 subscriptionId를 가져옵니다.
    const { subscriptionId } = params;

    // API 호출을 위한 URL을 동적으로 생성합니다.
    const apiUrl = `${process.env.PADDLE_API_URL}subscriptions/${subscriptionId}/update-payment-method-transaction`;
    
    // API 호출 시 필요한 헤더를 설정합니다.
    const headers = {
        "Authorization": `Bearer ${process.env.PADDLE_API_SECRET_KEY}`
    };

    // API를 호출합니다.
    const response = await fetch(apiUrl, {headers});

    // 응답에서 JSON 데이터를 추출합니다.
    const data = await response.json();
    const txnId = data.data.id


    return new NextResponse(JSON.stringify({txnId: txnId}), {
        headers: { "Content-Type": "application/json" },
    })
}