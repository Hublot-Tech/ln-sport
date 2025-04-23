export function getBaseUrl() {
  return process.env.ADMIN_URL ?? "http://localhost:3000";
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("fr", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
