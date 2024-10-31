import { facebook, github, message, twitter } from "../assets/images";
import { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const date = new Date();
    setCurrentYear(date.getFullYear());
  }, []);

  return (
    <footer className="mt-14 bg-black py-3 md:z-10">
      <section className="max-w-[85%] mx-auto flex justify-between items-center py-5">
        <div>
          <p className="text-sm text-gray-500">
            TWAU AFRICA LTD &copy;{currentYear}, All rights Reserved
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold  text-gray-500">Contact Us</h2>
          <div className="flex gap-5 items-center">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-6 flex justify-center items-center"
          >
            <img
              src={facebook}
              alt="Facebook"
              className="w-5 h-5 object-contain"
              style={{ filter: 'invert(38%) sepia(85%) saturate(1015%) hue-rotate(357deg) brightness(98%) contrast(97%)' }} // Adjust color using CSS filter
            />
          </a>
          <a
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-6 flex justify-center items-center"
          >
            <img
              src={github}
              alt="GitHub"
              className="w-5 h-5 object-contain"
              style={{ filter: 'invert(31%) sepia(15%) saturate(392%) hue-rotate(176deg) brightness(96%) contrast(96%)' }} // Adjust color using CSS filter
            />
          </a>
          <a
            href="https://www.message.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 h-10 w-6 flex justify-center items-center"
          >
            <img
              src={message}
              alt="Message"
              className="w-5 h-5 object-contain"
              style={{ filter: 'invert(34%) sepia(65%) saturate(483%) hue-rotate(206deg) brightness(96%) contrast(93%)' }} // Adjust color using CSS filter
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 h-10 w-6 flex justify-center items-center"
          >
            <img
              src={twitter}
              alt="Twitter"
              className="w-5 h-5 object-contain"
              style={{ filter: 'invert(53%) sepia(71%) saturate(532%) hue-rotate(187deg) brightness(99%) contrast(91%)' }} // Adjust color using CSS filter
            />
          </a>
        </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
