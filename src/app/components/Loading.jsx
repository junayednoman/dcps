import Image from "next/image";
import loading from "@/media/loading.svg"
const Loading = ({ small }) => {
    return (
        <>
            <div className="w-full h-screen flex justify-center gap-8 flex-col items-center">
                <Image width={110} src={loading} alt="loading"></Image>
                <h3 className="text-3xl font-semibold text-center">লোড হচ্ছে...</h3>
            </div>
            {
                small &&
                <div className="flex justify-center items-center">
                    <Image src={loading} width={100} alt="loading"></Image>
                </div>
            }
        </>
    );
};

export default Loading;