"use client"
import { useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { Input } from "@/components/ui/input";
import { signInWithEmail } from "@/lib/auth/login";

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(false);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await signInWithEmail({ email, password });
            console.log(res);
            if(res.session && res.user){
                window.location.href = '/showroom';
            }else{
                setError(true);
            }

        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

    return (
        <div className="lg:mx-auto mx-4 lg:w-[65%] bg-black text-white rounded-2xl my-10">
          <div className="h-[40rem] w-full rounded-2xl flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <div className="max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
              <h1 className="p-3 sm:text-6xl text-2xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                Login <br /> to find the best offers
              </h1>
              
              <form onSubmit={handleSignUp} className="flex flex-col items-center mt-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-white text-lg font-semibold">Email:</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl h-10 border-2" />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-white text-lg font-semibold">Password:</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl h-10 border-2" />
                </div>
                <button type="submit" className="bg-gradient-to-b from-neutral-50 to-neutral-400 rounded-xl text-black text-lg font-bold mt-3 py-2 px-4 rounded-lg">Login Now</button>
              </form>
              {error && (<h1 className="flex justify-center text-red-200 text-2xl font-semibold pt-10">
                Error when log in! 
              </h1>)}
            </div>
          </div>
        </div>
    );
};

export default LogInForm;
