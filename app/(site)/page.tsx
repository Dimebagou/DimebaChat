import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="
          flex
          min-h-full
          flex-col
          justify-center
          py-12
          sm:px-6
          lg:px-8
          bg-gray-900
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h2
          className="
            mt-6 
            text-center 
            text-2xl 
            font-bold 
            tracking-tight 
            text-gray-50
          "
        >
          Connectez-vous à DimebaChat
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
