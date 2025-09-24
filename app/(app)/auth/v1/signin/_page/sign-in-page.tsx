"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  LoginFormDefault,
  LoginFormSchema,
  LoginFormType,
} from "@/schemas/auth.schema";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import { APP_CONFIG } from "@/app.config";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import ThemeToggle from "@/app/(app)/app/_components/theme-toggle";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/app/overview";

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    ...rest
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginFormDefault,
  });

  const submit = async (data: LoginFormType) => {
    const { email, password } = data;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        const session = await getSession();
        if (session) {
          router.push(callbackUrl);
          toast.success(
            "Welcome back, " + session?.user.name?.split(" ")[0] + "!"
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full justify-between items-center flex flex-col  px-8 py-5 bg-background text-foreground">
      <div className="w-full text-foreground">
        <span>
          <span>Don&apos;t have an account? </span>
          <Link href="/auth/v1/register" className="text-primary">
            Sign Up
          </Link>
        </span>
      </div>

      <div className="max-w-[400px] w-full">
        <Form
          {...({
            ...rest,
            control,
            handleSubmit,
            formState: { isSubmitting },
          } as UseFormReturn<LoginFormType>)}>
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => submit(data))}>
            {/* HEADER */}
            <div className="gap-y-1 flex-col flex items-center  text-center">
              {/* <Logo className="w-10 h-auto" /> */}
              {/* <div className=" text-center space-y-1"> */}
              <h2 className="text-3xl font-semibold">
                Sign in to {APP_CONFIG.name}
              </h2>
              <p className="text-muted-foreground  text-sm max-w-[80%]">
                Welcome back to your wedding studio!
              </p>
              {/* </div> */}
            </div>

            {/* FORM BODY */}
            <div className="space-y-4">
              <FormField
                name="email"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          {...field}
                        />

                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="absolute top-1/2 right-[1.5px] -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <Eye className="h-4 w-4 stroke-muted-foreground" />
                          ) : (
                            <EyeOff className="h-4 w-4 stroke-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* FORM FOOTER */}
            <div className="w-full">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}>
                {isSubmitting && <Loader className="animate-spin" />}
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div
        className="w-full text-sm justify-between items-center flex text-muted-foreground
      ">
        <span>{APP_CONFIG.copyright}</span>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
