  "use client";
  import React, { useState } from "react";
  import styles from "./auth.module.css";
  import Link from "next/link";

  interface AuthFormProps {
    type: "signin" | "signup";
    onSubmit: (data: { username?: string; email?: string; password: string }) => void;
  }

  export default function AuthForm({ type, onSubmit }: AuthFormProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (type === "signin") {
        onSubmit({ username, password });
      } else {
        onSubmit({ username, email, password });
      }
    };

    return (
      <div className={styles.authWrapper}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <h2 className={styles.authTitle}>
            {type === "signin" ? "Sign In" : "Sign Up"}
          </h2>
          <div className={styles.fill}>
             <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </div>
         

          {type === "signup" && (
            <>

                      <div className={styles.fill}>

              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              </div>
            </>
          )}

          <div className={styles.fill}>

          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> 
          </div>
          <Link href={`/bookstore`}> 
            <button type="submit" className={styles.submitBtn}>
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
          </Link>
        

          <p className={styles.switchText}>
            {type === "signin"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a href={type === "signin" ? "/signup" : "/login"} className={styles.link}>
              {type === "signin" ? "Sign Up" : "Sign In"}
            </a>
          </p>
        </form>
      </div>
    );
  }
