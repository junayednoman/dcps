import BodyContainer from "../components/BodyContainer";
import ForgetPassword from "../components/ForgetPassword";

export default function Home() {
  return (
    <main>
      <BodyContainer>
        <div className="px-4 py-10 h-[80vh] flex flex-col justify-center items-center">
          <div className="w-full md:w-[500px] mx-auto md:pt-[80px] pt-14">
            <h4 className="md:text-[27px] text-2xl mb-10 font-semibold text-center">
              আপনার ইউজার আইডি দিন
            </h4>
            <div>
              <ForgetPassword />
            </div>
          </div>
        </div>
      </BodyContainer>
    </main>
  );
}
