import psLogo from "@/media/ps.svg";
import govLogo from "@/media/gov.svg";
import Image from "next/image";
import BodyContainer from "../components/BodyContainer";
import LoginForm from "../components/LoginForm";
import ResetPassword from "../components/ResetPass";

export default function Home() {
  return (
    <main>
      <BodyContainer>
        <div className="md:my-14 my-10 px-4">
          <div className="text-center">
          </div>
          <div className=" w-full md:w-[500px] mx-auto md:pt-[80px] pt-14">
            <h4 className="md:text-[27px] text-2xl mb-3 font-semibold">
              নতুন পাসওয়ার্ড দিন
            </h4>
            <div>
              <ResetPassword />
            </div>
          </div>
        </div>
      </BodyContainer>
    </main>
  );
}
