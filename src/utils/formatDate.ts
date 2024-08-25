export const formatDate = (createdAt: string | Date): string => {
    const now = new Date();
    const date = new Date(createdAt);
    const diff = now.getTime() - date.getTime(); // Difference in milliseconds

    const msInMinute = 1000 * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInMonth = msInDay * 30; // Approximation

    const minutes = Math.floor(diff / msInMinute);
    const hours = Math.floor(diff / msInHour);
    const days = Math.floor(diff / msInDay);

    if (diff < msInHour) {
        return `${minutes} minutes ago`;
    } else if (diff < msInDay) {
        return `${hours} hours ago`;
    } else if (diff < msInMonth) {
        return `${days} days ago`;
    } else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    }
};
