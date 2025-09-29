"use client";
import React from "react";
import AuthForm from "../../../components/AuthForm/authForm";

export default function SignInPage() {
  const handleSignIn = (data: { username?: string; password: string }) => {
    console.log("Sign In:", data);
  };

  return <AuthForm type="signin" onSubmit={handleSignIn} />;
}
