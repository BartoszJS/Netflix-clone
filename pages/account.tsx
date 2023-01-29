import Head from "next/head";
import Link from "next/link";
import React from "react";
import logo from "../public/become-a-programmer-logo.svg";
import { UserCircleIcon } from "@heroicons/react/solid";
import useSubscription from "../hooks/useSubscription";
import useAuth from "../hooks/useAuth";
import Membership from "../components/Membership";
import { GetStaticProps } from "next";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};

interface Props {
  products: Product[];
}

const account = ({ products }: Props) => {
  console.log(products);

  const { user, logout } = useAuth();
  const subscription = useSubscription(user);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={`bg-[#141414]`}>
        <Link href='/'>
          <img
            src={logo.src}
            alt='logo'
            width={200}
            height={100}
            className='cursor-pointer object-contain'
          />
        </Link>
        <Link href='/account'>
          <UserCircleIcon className=' sm:inline h-6 w-6 ' />
        </Link>
      </header>
      <main className='pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all mx:px-10'>
        <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div className='-ml-0.5 flex items-center gap-x-1.5'>
            <img src='' alt='' />
            <p className='text-xs font-semibold text-[#555]'>
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />
        <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0'>
          <h4 className='text-lg text-[gray]'>Plan Details</h4>
          {/* Find the current plan */}
          <div className='col-span-2 font-medium'>
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className='cursor-pointer text-blue-500 hover:underline md:text-right'>
            Change plan
          </p>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0'>
          <h4 className='text-lg text-[gray]'>Settings</h4>
          <p
            className='col-span-3 cursor-pointer text-blue-500 hover:underline'
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
};

export default account;
