import { FC } from "react";
import { signIn } from "next-auth/react";

const Hero: FC = () => {
  return <div className="hero min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Kacktimer 💩</h1>
        <p className="py-6">Du hältst dich für einen Vielkacker? Miss dich mit anderen Kackern und verschwende am meisten Zeit auf dem Klo!</p>
        <button onClick={() => signIn("google")} className="btn btn-primary">Login</button>
      </div>
    </div>
  </div>;
};

export default Hero;