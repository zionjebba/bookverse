"use client";
import React from "react";
import AuthForm from "../../../components/authform/authForm";

export default function SignUpPage() {
  const handleSignUp = (data: {
    username?: string;
    email?: string;
    password: string;
  }) => {
    console.log("Sign Up:", data);
  };

  return <AuthForm type="signup" onSubmit={handleSignUp} />;
}
