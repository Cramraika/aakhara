import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aakhara — The Practice Arena for Sales",
  description: "Voice roleplay training for BDEs. आखाड़ा — your practice arena.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
