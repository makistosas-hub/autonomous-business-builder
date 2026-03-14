"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import {
  BarChart3,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "RivalSense";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

type FormState = "idle" | "loading" | "error" | "success";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
  ];
  if (password.length === 0) return null;
  return (
    <div className="flex gap-3 mt-1.5">
      {checks.map((c) => (
        <span
          key={c.label}
          className="flex items-center gap-1 text-xs"
          style={{
            color: c.ok
              ? "var(--color-status-success)"
              : "var(--color-text-tertiary)",
          }}
        >
          <CheckCircle className="w-3 h-3" />
          {c.label}
        </span>
      ))}
    </div>
  );
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = (): string | null => {
    if (!name.trim()) return "Please enter your full name.";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      return "Please enter a valid email address.";
    if (password.length < 8)
      return "Password must be at least 8 characters.";
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      setFormState("error");
      return;
    }
    setFormState("loading");
    setErrorMsg("");

    // Auth integration point — Convex auth will be wired here
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setFormState("success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setFormState("error");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo + heading */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:opacity-90 transition-opacity"
              style={{ background: "var(--color-brand-navy)" }}
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {APP_NAME}
            </span>
          </Link>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            Start your free trial
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            14 days free · No credit card required
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border-default)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* Success state */}
          {formState === "success" && (
            <div
              className="flex flex-col items-center text-center py-6"
              role="status"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: "rgba(16,185,129,0.12)" }}
              >
                <CheckCircle
                  className="w-7 h-7"
                  style={{ color: "var(--color-status-success)" }}
                />
              </div>
              <h2
                className="text-lg font-bold mb-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                Account created!
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Redirecting you to your dashboard...
              </p>
            </div>
          )}

          {formState !== "success" && (
            <>
              {/* Google SSO */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:opacity-90 mb-5"
                style={{
                  border: "1px solid var(--color-border-default)",
                  color: "var(--color-text-primary)",
                  background: "var(--color-bg-primary)",
                }}
              >
                <GoogleIcon />
                Sign up with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--color-border-default)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  or with email
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--color-border-default)" }}
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Error alert */}
                {formState === "error" && (
                  <div
                    className="flex items-start gap-2 px-3 py-2.5 rounded-lg mb-4 text-sm"
                    role="alert"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      color: "var(--color-status-error)",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-4 mb-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Johnson"
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        border: "1px solid var(--color-border-default)",
                        color: "var(--color-text-primary)",
                        background: "var(--color-bg-primary)",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        border: "1px solid var(--color-border-default)",
                        color: "var(--color-text-primary)",
                        background: "var(--color-bg-primary)",
                      }}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="w-full px-3 py-2.5 pr-10 rounded-xl text-sm outline-none"
                        style={{
                          border: "1px solid var(--color-border-default)",
                          color: "var(--color-text-primary)",
                          background: "var(--color-bg-primary)",
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff
                            className="w-4 h-4"
                            style={{ color: "var(--color-text-tertiary)" }}
                          />
                        ) : (
                          <Eye
                            className="w-4 h-4"
                            style={{ color: "var(--color-text-tertiary)" }}
                          />
                        )}
                      </button>
                    </div>
                    <PasswordStrength password={password} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brand-electric) 0%, var(--color-brand-electric-vivid) 100%)",
                  }}
                >
                  {formState === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Free Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p
                  className="text-xs text-center mt-4"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  By signing up, you agree to our{" "}
                  <a
                    href="#"
                    className="hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </>
          )}
        </div>

        {/* Sign in link */}
        <p
          className="text-center text-sm mt-5"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--color-brand-electric)" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
