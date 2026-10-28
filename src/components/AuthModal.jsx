import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { closeAuthModal, setAuthMode } from "../redux/authSlice";

function AuthModalContent() {
  const dispatch = useDispatch();
  const authMode = useSelector((state) => state.auth.authMode);

  const isLogin = authMode === "login";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);

  const panelRef = useRef(null);
  const firstInputRef = useRef(null);

  // Focus first input and lock body scroll on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Global Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeAuthModal());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const handleBackdropClick = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      dispatch(closeAuthModal());
    }
  };

  const handleSwitchMode = (targetMode) => {
    setErrors({});
    setNotice(null);
    setPassword("");
    setConfirmPassword("");
    dispatch(setAuthMode(targetMode));
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);
  };

  const validate = () => {
    const newErrors = {};

    if (!isLogin && !username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!isLogin) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice(null);

    if (!validate()) {
      return;
    }

    // Backend service not configured notice
    setNotice({
      type: "info",
      message: `Authentication backend is not connected yet. A real backend service is required to complete ${
        isLogin ? "login" : "account registration"
      }.`,
    });
    // Never store plaintext passwords
    setPassword("");
    setConfirmPassword("");
  };

  const handleSocialClick = (provider) => {
    setNotice({
      type: "info",
      message: `Social login with ${provider} is a placeholder and requires OAuth provider integration.`,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isLogin ? "Login dialog" : "Signup dialog"}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[1px]"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] bg-[#141414] border border-[#262626] p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => dispatch(closeAuthModal())}
          aria-label="Close dialog"
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <IoClose size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {/* Mode Switcher */}
        <p className="mt-1 text-xs sm:text-sm text-[#a8b1c5]">
          {isLogin ? (
            <>
              New to Tech-Shop ?{" "}
              <button
                type="button"
                onClick={() => handleSwitchMode("signup")}
                className="text-white hover:underline font-medium cursor-pointer"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account ?{" "}
              <button
                type="button"
                onClick={() => handleSwitchMode("login")}
                className="text-white hover:underline font-medium cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </p>

        {/* Notice Message */}
        {notice && (
          <div className="mt-4 p-3 bg-[#1e1e1e] border border-amber-600/50 text-amber-200 text-xs rounded-sm leading-relaxed">
            {notice.message}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          {/* Username (Signup only) */}
          {!isLogin && (
            <div>
              <input
                ref={firstInputRef}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors((prev) => ({ ...prev, username: "" }));
                  }
                }}
                aria-label="Username"
                aria-invalid={Boolean(errors.username)}
                className={`w-full bg-[#121212] border px-4 py-2.5 sm:py-3 text-sm text-white placeholder-[#7f8594] focus:outline-none ${
                  errors.username
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#383838] focus:border-[#555]"
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <input
              ref={isLogin ? firstInputRef : null}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
              aria-label="Email"
              aria-invalid={Boolean(errors.email)}
              className={`w-full bg-[#121212] border px-4 py-2.5 sm:py-3 text-sm text-white placeholder-[#7f8594] focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#383838] focus:border-[#555]"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
              aria-label="Password"
              aria-invalid={Boolean(errors.password)}
              className={`w-full bg-[#121212] border px-4 py-2.5 sm:py-3 text-sm text-white placeholder-[#7f8594] focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#383838] focus:border-[#555]"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }
                }}
                aria-label="Confirm Password"
                aria-invalid={Boolean(errors.confirmPassword)}
                className={`w-full bg-[#121212] border px-4 py-2.5 sm:py-3 text-sm text-white placeholder-[#7f8594] focus:outline-none ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#383838] focus:border-[#555]"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#e10600] hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 transition-colors cursor-pointer mt-2"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-[#333333]"></div>
          <span className="absolute bg-[#141414] px-3 text-xs text-[#a8b1c5]">
            or login with
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleSocialClick("Facebook")}
            className="w-full bg-[#3b5998] hover:opacity-90 py-2.5 text-xs sm:text-sm font-medium text-white transition-opacity text-center cursor-pointer"
          >
            Facebook
          </button>
          <button
            type="button"
            onClick={() => handleSocialClick("Google")}
            className="w-full bg-[#b72b14] hover:opacity-90 py-2.5 text-xs sm:text-sm font-medium text-white transition-opacity text-center cursor-pointer"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialClick("Twitter")}
            className="w-full bg-[#1da1f2] hover:opacity-90 py-2.5 text-xs sm:text-sm font-medium text-white transition-opacity text-center cursor-pointer"
          >
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
}

function AuthModal() {
  const isAuthModalOpen = useSelector((state) => state.auth.isAuthModalOpen);

  if (!isAuthModalOpen) return null;

  return <AuthModalContent />;
}

export default AuthModal;
