import psLogo from "@/media/ps.svg";
import govLogo from "@/media/gov.svg";
import Image from "next/image";
import LoginForm from "./components/LoginForm";
import BodyContainer from "./components/BodyContainer";

export default function Home() {
  return (
    <main>
      <BodyContainer>
        <div className="md:my-14 my-10 px-4">
          <div className="text-center">
            <div className="flex justify-between items-center gap-6 mb-8">
              <a href="https://www.dpe.gov.bd/" target="_blank">
                <Image
                  style={{ width: "auto", height: "auto" }}
                  width={80}
                  height={80}
                  src={psLogo}
                  alt="primary education logo"
                  className="mb-5 max-w-[80px]"
                ></Image>
              </a>
              <h1 className="md:text-[60px] text-3xl font-bold w-full md:w-[500px] mx-auto md:leading-[50px]">
                Go 2 Bill
              </h1>
              <a href="https://bangladesh.gov.bd/" target="_blank">
                <Image
                  style={{ width: "auto", height: "auto" }}
                  width={80}
                  height={80}
                  src={govLogo}
                  alt="Bd GOV logo"
                  className="mb-5 max-w-[80px]"
                ></Image>
              </a>
            </div>
          </div>
          <div className=" w-full md:w-[500px] mx-auto md:pt-[80px] pt-14">
            <h4 className="md:text-[27px] text-2xl mb-3 font-semibold">
              সাইন ইন করুন
            </h4>
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </BodyContainer>
    </main>
  );
}
