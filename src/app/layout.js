import localFont from "next/font/local"
import "./globals.css";

const notoBengali = localFont({
  src: "../../public/fonts/NotoSansBengali-Regular.ttf",
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
      <body className={notoBengali.className}>{children}</body>
    </html>
  );
}
