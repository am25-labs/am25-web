import PlausibleScript from "@/components/PlausibleScript";
import "./globals.css";
import { baseMetadata } from "@/lib/metadata";
import { Martian_Mono } from "next/font/google";

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const tracking = process.env.DEPLOY_ENV === "production";

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {tracking && (
          <script
            defer
            data-domain={process.env.PLAUSIBLE_DOMAIN}
            src="https://analytics.alemartir.com/js/script.outbound-links.tagged-events.js"
          ></script>
        )}
      </head>
      <body className={`${martian.className} bg-background antialiased`}>
        <PlausibleScript />
        {children}
      </body>
    </html>
  );
}
