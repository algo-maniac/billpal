export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/groups", "/groups/:slug*"],
};
