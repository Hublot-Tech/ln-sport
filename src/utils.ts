export function getBaseUrl() {
  const NEXT_API_BASE_URL = process.env.NEXT_API_BASE_URL;

  if (NEXT_API_BASE_URL) {
    return NEXT_API_BASE_URL;
  }

  return process.env.NODE_ENV === "production"
    ? "https://admin-ln-foot.vercel.app"
    : "http://localhost:3000";
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("fr", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
