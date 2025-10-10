import "./globals.css";
import Navbar from "./components/Navbar";
import Top from "./components/Top";
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Mesnaldo",
  description: "Ronaldo vs Messi stats blog",
  icons: {
    icon: "/goat.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <Top/> 
        <main>{children}</main>
        <Analytics/>
      </body>
    </html>
  );
}