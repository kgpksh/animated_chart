const formatDateString = (dateString) => {
    // Date 객체 생성
    const date = new Date(dateString);
    
    // 연도, 월, 일 추출
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getUTCDate()).padStart(2, '0');

    // 시, 분 추출
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // 오전/오후 결정
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환

    // 형식에 맞게 문자열 생성
    return `UTC ${year}/${month}/${day} ${hours}:${minutes}${ampm}`;
}

export default formatDateString