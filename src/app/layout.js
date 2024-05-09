import localFont from "next/font/local"
import "./globals.css";
import AuthContextProvider from "@/authContext/AuthContext";


const notoBengali = localFont({
  src: [
    { path: "../../public/fonts/NotoSansBengali-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/NotoSansBengali-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/NotoSansBengali-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/NotoSansBengali-Bold.ttf", weight: "700" },
  ],
  display: "swap",
});
// const notoBengali = localFont({
//   src: "../../node_modules/next/font/local/NotoSansBengali-Regular.ttf",
//   display: "swap",
// });

export const metadata = {
  title: "প্রাথমিক বিদ্যালয়ের তথ্য ব্যবস্থাপনা সিস্টেম",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoBengali.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
