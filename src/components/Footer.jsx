import { useState } from "react";
import { footMenu, footSocial } from "../data/footerData";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="mx-3 mb-3 overflow-hidden rounded-b-xl bg-black text-[#a8b1c5] sm:mx-6">
      <div className="grid grid-cols-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr] lg:gap-12">
        <div>
          <h2 className="text-2xl font-bold text-[#a8b1c5]">
            Tech-Shop
          </h2>

          <p className="mt-3 max-w-md text-sm leading-5 text-[#858b9a]">
            Subscribe to our Email alerts to receive early discount offers,
            and new products info.
          </p>

          <form onSubmit={handleSubscribe} className="mt-4 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address*"
              aria-label="Email address"
              className="w-full rounded-sm border border-[#555] bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#777] focus:border-[#e10600]"
            />

            <button
              type="submit"
              className="mt-4 rounded-sm bg-[#e10600] px-6 py-3 text-sm text-white transition-colors hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        {footMenu.map((section) => (
          <div key={section.id}>
            <h3 className="mb-6 text-base font-bold text-[#a8b1c5]">
              {section.title}
            </h3>

            <ul className="space-y-4">
              {section.menu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="text-sm text-[#858b9a] transition-colors hover:text-white"
                  >
                    {item.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-5 border-t border-[#202020] px-6 py-6 sm:px-10 md:flex-row">
        <p className="text-sm text-[#858b9a]">
          {new Date().getFullYear()} | All Rights Reserved ©.
        </p>

        <div className="flex items-center gap-7">
          {footSocial.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.id}
                href={social.path}
                aria-label={`Social media ${social.id}`}
                className="text-[#a8b1c5] transition-colors hover:text-[#e10600]"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;