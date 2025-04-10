import React from 'react'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Footer from "../_components/Footer";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen">
        <div className="">
            <div className="ml-60 mt-10">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>Score en direct </li>
                    </ul>
                </div>
            </div>
            <h1 className='text-center text-[#F3653D] text-4xl mt-[5rem] font-bold'>CONTACT US</h1>
            <p className='md:mx-[15rem] mx-[5rem] text-justify mt-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quae esse assumenda tenetur omnis molestiae? Consectetur tempora
                eius odio cupiditate quod ipsum eaque fugiat, labore, iure laborum, repellat unde totam quo?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quae esse assumenda tenetur omnis molestiae? Consectetur tempora
                eius odio cupiditate quod ipsum eaque fugiat, labore, iure laborum, repellat unde totam quo?
            </p>
        </div>
        
        <section className="flex flex-col md:flex-row justify-center items-center md:space-x-12 px-4 md:px-0 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">GET IN TOUCH</h2>
                <p className="text-gray-600 mb-4">
                    VITAE DOLOR AT NON EGET LACUS EU NEC VIVERRA ELIT. SOLLICITUDIN. TINCIDUNT ELIT SIT AT, UT DIGNISSIM, EU PLACERAT QUIS FACILISIS NON. IPSUM NULLAM
                </p>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white bg-orange-600 rounded-full p-2 mr-4 w-8 h-8" />
                        <div>
                            <p className="font-bold">ADDRESS</p>
                            <p>DOUALA, CMR</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faPhoneAlt} className="text-white bg-orange-600 rounded-full p-2 mr-4 w-8 h-8" />
                        <div>
                            <p className="font-bold">PHONE NUMBER</p>
                            <p>+237 6715254727</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="text-white bg-orange-600 rounded-full p-2 mr-4 w-8 h-8" />
                        <div>
                            <p className="font-bold">E-MAIL</p>
                            <p>FRANCKDJK@GMAIL.COM</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="font-bold">FOLLOW US</p>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="YouTube">
                            <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-[rgba(187,187,187,0.2)] p-6 rounded-lg shadow-md w-full md:w-1/3 mt-8 md:mt-0">
                <h2 className="text-2xl font-bold mb-4">ENVOYER UN MESSAGE</h2>
                <form>
                    <div className="mb-4">
                        <input type="text" placeholder="NOM" className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded"/>
                    </div>
                    <div className="mb-4">
                        <input type="email" placeholder="E-MAIL ADDRESS" className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded"/>
                    </div>
                    <div className="mb-4">
                        <textarea placeholder="MESSAGE" className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded"></textarea>
                    </div>
                    <div className='mb-4'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi ipsum tempora dicta, sapiente consectetur quo.
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" className="w-1/4 bg-orange-600 text-white p-3 rounded">ENVOYER</button>
                    </div>
                </form>
            </div>
        </section>
    </main>
    <Footer />
    </>
  )
} 