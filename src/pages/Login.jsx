import { useForm } from "react-hook-form";
import { loginSchema } from "../utils/formValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../api/axios";
import { useState } from "react";
import cn from "../utils/cn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState({ success: false, message: "" });
  const navigate = useNavigate()
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await axios.post("/users/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      setAuth(response?.data?.data);
      setErrMsg({
        success: response?.data?.success,
        message: response?.data?.message,
      });
      
      reset();

      navigate(from, { replace: true });
    } catch (error) {
      // console.log("error/////", error);
      if (!error?.response) {
        setErrMsg({
          success: false,
          message: "No Server Response or Network error",
        });
      } else {
        setErrMsg({
          success: false,
          message: error?.response?.data?.message,
        });
      }
    }
  };

  return (
    <section className="h-full flex items-center justify-center">
      <form
        className=" w-[90%] sm:w-[400px] flex flex-col gap-2 bg-slate-300 dark:bg-slate-700 p-4 rounded-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold pb-2 border-b-2">
          Login
        </h1>

        {errMsg.message && (
          <p
            className={cn("font-semibold text-xl text-center  text-red-600", {
              "text-green-600": errMsg.success,
            })}
          >
            {errMsg?.message}
          </p>
        )}

        <div>
          <input
            className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
            type="email"
            placeholder="Your Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm font-semibold text-red-700">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            className="w-full rounded-md px-2 py-1 dark:bg-slate-800"
            type="password"
            placeholder="Your Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm font-semibold text-red-700">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          className="bg-slate-600 py-1 rounded-md font-semibold hover:bg-slate-500"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submiting..." : "Submit"}
        </button>

        <p>
          <Link className="underline text-blue-600" to={"/signup"}>
            Do not have an account?
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
