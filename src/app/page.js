import psLogo from "@/media/ps.svg"
import govLogo from "@/media/gov.svg"
import Image from "next/image";
import BodyContainer from "./components/BodyContainer";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main>
      <BodyContainer>
        <div className="md:my-14 my-10">
          <div className="text-center">
            <div className="flex justify-center items-center gap-6 mb-5">
              <a href="https://www.dpe.gov.bd/" target="_blank">
                <Image style={{width: "auto", height: "auto"}} width={80} height={80} src={psLogo} alt="primary education logo" className="mb-5 max-w-[80px]"></Image>
              </a>
              <a href="https://bangladesh.gov.bd/" target="_blank">
                <Image style={{width: "auto", height: "auto"}} width={80} height={80} src={govLogo} alt="Bd GOV logo" className="mb-5 max-w-[80px]"></Image>
              </a>
            </div>
            <h1 className="md:text-[45px] text-3xl font-bold w-full md:w-[500px] mx-auto md:leading-[50px]">প্রাথমিক বিদ্যালয়ের তথ্য ব্যবস্থাপনা সিস্টেম</h1>
          </div>
          <div className=" w-full md:w-[550px] mx-auto md:pt-[80px] pt-14">
            <h4 className="md:text-[27px] text-2xl mb-3 font-semibold">সাইন ইন করুন</h4>
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </BodyContainer>
    </main>
  );
}