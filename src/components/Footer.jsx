import { facebook, github, message, twitter } from "../assets/images"

const Footer = () => {
  return (
    <footer className="mt-14 bg-black py-3 md:z-10">
      <section className="max-w-[85%] mx-auto flex justify-between items-center py-5">
        <div>
          <p className="text-sm text-gray-500">
            TWAU AFRICA LTD&copy;2020-2024, All rights Reserved
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <div className="p-2 rounded-md">
            <img src={facebook} alt="visa" />
          </div>
          <div className="bg-white p-2 rounded-md">
            <img src={github} alt="mastercard" />
          </div>
          <div className="bg-white p-1 rounded-md">
            <img src={message} alt="message" />
          </div>
          <div className="bg-white p-2 rounded-md">
            <img src={twitter} alt="twitter" />
          </div>
        </div>
      </section>
  </footer>
  
    
  )
}

export default Footer