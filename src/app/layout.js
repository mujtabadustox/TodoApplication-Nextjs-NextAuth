import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "CCRIPT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[url('/assets/images/image.webp')] bg-cover bg-opacity-30">
        <AuthProvider>
          <Navbar />
          <div className="flex flex-1 justify-center items-center min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
