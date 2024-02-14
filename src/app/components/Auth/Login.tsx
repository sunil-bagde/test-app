"use client";

import { useCookies } from "react-cookie";
import useSetState from "@/app/hooks/useSetState";
import { validateEmail, validate } from "@/app/utils/login";
import { login as doLogin } from "@/app/services/auth";

import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function Login() {
  let [cookies, setCookie, removeCookie] = useCookies();

  let [state, setState] = useSetState({
    validationError: {},
    isSubmiting: false,
    loginError: "",
  });
  let router = useRouter();
  let { validationError, isSubmiting, loginError } = state;
  let handleLogin = async event => {
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
      setState({ validationError: {} });
    }
    // submit
    try {
      let { data: userData } = await doLogin({
      
        email,
        password,
      });
      setCookie("currentUser", JSON.stringify(userData));
      router.push(`/`);
    } catch (err) {
      console.log("err", err);
      setState({
        validationError: {},
        isSubmiting: false,
        loginError: "Please check username or password",
      });
    }
  };
  return (
    <>
      <div className="primary-1 mx-auto flex h-screen max-w-md flex-col  justify-center justify-between px-1 py-6  ">
        <div className="flex-1 ">
          <section className="mt-[2.75rem] border  border-primary-2">
            <div className="mt-[2rem] sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className=" text-center  text-[1.064rem]    tracking-tight text-purple-200 ">
                Welcome Back !
              </h2>
              <p className="mt-0 text-center text-xs leading-8 tracking-tight text-gray-400">
                Sign in to continue.
              </p>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {loginError ? (
                <div
                  className="dark: mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Login error!</span> {loginError}
                </div>
              ) : null}
              <form
                noValidate
                className="space-y-6 px-1"
                onSubmit={handleLogin}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-primary-3"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter email"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2.5 text-primary-3 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium"> </span>{" "}
                    {validationError.email}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-primary-3"
                    >
                      Password
                    </label>
                    <div className="hidden text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Enter password"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2.5 text-primary-3 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium"> </span>{" "}
                    {validationError.password}
                  </p>
                </div>
                <p className="mt -mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"> </span>{" "}
                  {validationError.captcha}
                </p>
                <div className=" pb-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmiting}
                    className={` ${
                      isSubmiting ? "opacity-40" : ""
                    }flex w-full justify-center rounded-md bg-primary-4  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-4`}
                  >
                    <span className="flex items-center justify-center">
                      {isSubmiting ? <SpinLoader /> : <></>}
                      Login
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>

        <div className="  flex justify-center text-xs text-primary-5">
          @ {new Date().getFullYear()} Fullstack test. Crafted with ❤️ by Sunil
        </div>
      </div>
    </>
  );
}

function SpinLoader() {
  return (
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
