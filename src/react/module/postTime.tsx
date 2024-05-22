export const displayCreatedAt = (createdDate: string | number | Date) => {
  const today = new Date(); // 현재 시간
  const timeValue = new Date(createdDate); // 게시물 시간

  // 시간 차이 계산
  const timeDiff = today.getTime() - timeValue.getTime();
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return "방금 전";
  }
};

export function formatDateTime(dateTimeString: string | number | Date) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, "0"); // 일
  const hours = String(date.getHours()).padStart(2, "0"); // 시간
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}
