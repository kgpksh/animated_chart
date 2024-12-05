# Animated-chart

## 1. 개요
브라우저에서 짧은 사용자 지정 차트 애니메이션을 편집하고, 로컬 PC로 다운로드 할 수 있게 하는 월간 구독 서비스. 기획, 디자인, 코드작성까지 1인 개발.

## 2. 기술 스택
Next.js, Javascript, Chartjs, Zustand, Shadcn, Firebase, AWS EC2 + Paddle(결제수단)

## 3. 구조
결제 수단으로 Paddle 사용, Paddle에서 제공하는 웹훅을 Firebase Cloud Functions에 걸어 Firestore DB 저장. 조건을 변경해가며 애니메이션을 만들어보는 것은 누구나 할 수 있지만, 구독 결제자에 한해 다운로드 가능.
애니메이션 영상 작업을 브라우저에서 하고, 서버는 결제 정보만 저장