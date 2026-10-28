
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const footerSections = [
    {
      title: "Help",
      links: [
        "FAQs",
        "Track Order",
        "Cancel Order",
        "Return Order",
        "Warranty Info",
      ],
    },
    {
      title: "Policies",
      links: [
        "Return Policy",
        "Security",
        "Sitemap",
        "Privacy Policy",
        "Terms & Conditions",
      ],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Contact Us",
        "Service Centres",
        "Careers",
        "Affiliates",
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaTwitter, label: "Twitter" },
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaLinkedinIn, label: "LinkedIn" },
  ];

  return (
    <footer className="mx-3 mb-3 overflow-hidden rounded-b-xl bg-black text-[#a8b1c5] sm:mx-6">
      {/* Main footer content */}
      <div className="grid grid-cols-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr] lg:gap-12">
        {/* Brand and newsletter */}
        <div>
          <h2 className="text-2xl font-bold text-[#a8b1c5]">
            Tech-Shop
          </h2>

          <p className="mt-3 max-w-md text-sm leading-5 text-[#858b9a]">
            Subscribe to our Email alerts to receive early discount offers,
            and new products info.
          </p>

          <form
            className="mt-4 max-w-md"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              required
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

        {/* Link columns */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-6 text-base font-bold text-[#a8b1c5]">
              {section.title}
            </h3>

            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#858b9a] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-5 border-t border-[#202020] px-6 py-6 sm:px-10 md:flex-row">
        <p className="text-sm text-[#858b9a]">
          {new Date().getFullYear()} | All Rights Reserved ©.
        </p>

        <div className="flex items-center gap-7">
          {socialLinks.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-[#a8b1c5] transition-colors hover:text-[#e10600]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
