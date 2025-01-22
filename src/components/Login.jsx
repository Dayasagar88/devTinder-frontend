"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    // Add validation logic here if needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle form submission logic here
    setIsLoading(false);
  };

  return (
    <div className=" min-h-screen flex items-center justify-center p-4 animate-fade-in"
    style={{
      background: "linear-gradient(to right, #514A9D, #24C6DC)",
    }}>
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Welcome Back to DevTinder
        </h1>
        <div className="bg-gray-800 p-6 shadow-lg rounded-[6px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg text-sm"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="mt-1 block w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="mt-1 block w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/signup"
              className="text-sm text-cyan-300 hover:text-cyan-400"
            >
              {"Don't"} have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
