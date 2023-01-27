import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import banner from "../public/banner.jpg";
import logo from "../public/become-a-programmer-logo.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center bg-transparent'>
      <Head>
        <title>Become A Programmer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image
        className='-z-10 opacity-60 object-cover'
        src={banner.src}
        fill={true}
        alt='banner'
      />
      <img
        src={logo.src}
        alt='logo'
        width={200}
        height={100}
        className='cursor-pointer object-contain absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
      >
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              className='input'
              type='email'
              placeholder='Email'
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className='p-1 text-[12px] font-light text-orange-500'>
                Email required
              </span>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              className='input'
              placeholder='Password'
              type='password'
              autoComplete='on'
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className='p-1 text-[12px] font-light text-orange-500'>
                Password is required
              </span>
            )}
          </label>
        </div>

        <button
          className='w-full rounded bg-[#fff] text-black py-3 font-semibold'
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className='text-gray-300'>
          New?{" "}
          <button
            type='submit'
            className='text-white hover:underline'
            onClick={() => setLogin(false)}
          >
            {" "}
            Sign Up here
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
