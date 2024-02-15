"use client";

import useSetState from "@/app/hooks/useSetState";
import { validateEmail, validate } from "@/app/utils/login";
import { login as doLogin } from "@/app/services/auth";
import { HOME_ROUTE } from "@/app/constants/routes";
import { LoginForm } from "@/app/components/Auth/LoginForm";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import * as React from "react";

const initialErrors = { email: "", password: "" };

export function Login() {

  let [state, setState] = useSetState({
    validationError: initialErrors,
    isSubmiting: false,
    loginError: "",
  });

  let router = useRouter();
 
 

  let { validationError, isSubmiting, loginError } = state;
  let handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setState({ isSubmiting: true, loginError: "" });
 

    let formData = new FormData(event.target as HTMLFormElement);
    let email = formData.get("email") as string;
   
    let password = formData.get("password") as string;
 
    let validateError = validate({
      email,
      password,
    });
    let { email: emailError, password: passwordError } = validateError;
   
    if (emailError || passwordError) {
      setState({
        validationError: validateError,
        isSubmiting: false,
      });
      return;
    } else {
      setState({ validationError: initialErrors });
    }
    // submit
    try {
 
      let { data: userData } = await doLogin({
        email,
        password,
      });
      router.push(HOME_ROUTE);

    } catch (err) {
 
      setState({
        validationError: initialErrors,
        isSubmiting: false,
        loginError: "Please check username or password",
      });
    }
  };
  return (
    <>
      <div className='primary-1 mx-auto flex h-screen max-w-md flex-col  justify-center justify-between px-1 py-6  '>
        <div className='flex-1 '>
          <section className='mt-[2.75rem] border  border-primary-2'>
            <div className='mt-[2rem] sm:mx-auto sm:w-full sm:max-w-sm'>
              <h2 className=' text-center  text-[1.064rem]    tracking-tight text-purple-200 '>
                Welcome Back !
              </h2>
              <p className='mt-0 text-center text-xs leading-8 tracking-tight text-gray-400'>
                Sign in to continue.
              </p>
            </div>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
              {loginError ? (
                <div
                  className='dark: mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:text-red-400'
                  role='alert'
                >
                  <span className='font-medium'>Login error!</span> {loginError}
                </div>
              ) : null}
              <LoginForm formData={state} onLogin={handleLogin} />
            </div>
          </section>
        </div>

        <div className='  flex justify-center text-xs text-primary-5'>
          @ {new Date().getFullYear()} Fullstack test. Crafted with ❤️ by Sunil
        </div>
      </div>
    </>
  );
}


