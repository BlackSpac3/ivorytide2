import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if the user is accessing admin routes
        if (req.nextUrl.pathname.startsWith("/app")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/app/:path*"],
};
