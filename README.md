# Animated-chart

## 1. 개요
브라우저에서 짧은 사용자 지정 차트 애니메이션을 편집하고, 로컬 PC로 다운로드 할 수 있게 하는 월간 구독 서비스. 기획, 디자인, 코드작성까지 1인 개발.

## 2. 기술 스택
Next.js, Javascript, Chartjs, Zustand, Shadcn, Firebase, AWS EC2 + Paddle(결제수단)

## 3. 구조
Chartjs는 캔버스 위에 차트와 애니메이션을 나타냅니다. 캔버스는 MediaRecorder로 동영상으로 만들 수 있으므로 이를 이용하였습니다.

결제 수단으로 Paddle 사용, Paddle에서 제공하는 웹훅을 Firebase Cloud Functions에 걸어 Firestore DB 저장. 조건을 변경해가며 애니메이션을 만들어보는 것은 누구나 할 수 있지만, 구독 결제자에 한해 다운로드 가능.
애니메이션 영상 작업을 브라우저에서 하고, 서버는 결제 정보만 저장
![1](https://github.com/user-attachments/assets/e999b2c0-4ff1-4740-acfa-f87d9331403a)
![2](https://github.com/user-attachments/assets/097b7e83-bf95-4c32-b7be-5d179a45c2cb)
![3](https://github.com/user-attachments/assets/84c56545-4aa8-4b5f-af39-06a93aabdaaf)
![4](https://github.com/user-attachments/assets/2c63db7c-4d88-4894-9ad1-8b27582406ea)
