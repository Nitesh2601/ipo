"use client";
import React,{useState} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrentIssuesTable } from "@/components/tables/CurrentIssuesTable";
import { UpcomingTable } from "@/components/tables/UpcomingTable";
import { PastIpoTable } from "@/components/tables/PastIposTable";
import { Section } from "lucide-react";
import { LiveIposTable } from "@/components/tables/bseSme/LiveIposTable";
import { ForthIposTable } from "@/components/tables/bseSme/ForthIposTable";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar"
import { useSession, signOut } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Faq } from "@/components/Faq";
import { SparklesCore } from "@/components/ui/sparkles";
import { EncryptedText } from "@/components/ui/encrypted-text"

import ClientOnly from "@/components/ClientOnly";

import { toast } from "sonner";


export default function Home() {

  const [loginOpen, setLoginOpen] = React.useState(false);
  const { data: session } = useSession();

  return (
      <div className=" relative mx-auto max-w-7xl flex flex-col">

        <div className="w-full px-8 mx-auto ">
          <Navbar loginOpen={loginOpen} setLoginOpen={setLoginOpen} />

          <nav className="w-full p-3 mt-4  flex justify-end pr-8 rounded-4xl items-center bg-[#35a13f]">

            {/* Centered & padded welcome text */}
            {session && (
              <span className="text-white font-semibold px-4 py-2 text-lg">
                Hi, {session.user.name}
              </span>
            )}

            <Button
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-black"
              onClick={async() => {
                if (session) {
                  await signOut({ redirect: false });
                   toast.success("Logged out successfully");
                } else {
                  setLoginOpen(true);
                }
              }}
            >
              {session ? "Logout" : "Login"}
            </Button>
          </nav>

          <section className=" relative w-full h-[70vh]  flex flex-col justify-center items-center text-center px-4">
             {/* 🔹 SEO PRIMARY HEADING (invisible to users) */}
            <h1 className="sr-only">
              IPO Hunters – Live IPO GMP, Current & Upcoming IPOs in India
            </h1>

            <ClientOnly>
              <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="absolute  inset-0 z-0 pointer-events-none"
              particleColor="#46c351"
            />
            </ClientOnly>
              {/* Website Name */}
  
              <ClientOnly>
                <EncryptedText
                  className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-800"
                  text="Welcome to IPO Hunters"
                />
              </ClientOnly>

              <h2 className="mt-5 font-inter text-xl md:text-2xl lg:text-3xl font-medium text-[#3bb446]  leading-relaxed">
                Smart IPO insights. Faster, confident investment decisions.
              </h2>

            </section>

           <section >
              <h4 className="text-lg font-semibold w-full text-center text-gray-800 tracking-wide mb-8">
                  Mainboard & SME IPOs on NSE
                </h4>
            <Tabs defaultValue="current" className="w-full">
                <TabsList >
                  <TabsTrigger  value="current">Current Issues</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming IPOs</TabsTrigger>
                  <TabsTrigger value="past">Past IPOs</TabsTrigger>
                </TabsList>

                <TabsContent value="current">
                  <CurrentIssuesTable/>
                  
                </TabsContent>

                <TabsContent value="upcoming">
                  <UpcomingTable/>
                </TabsContent>

                <TabsContent value="past">
                  <PastIpoTable/>
                </TabsContent>
              </Tabs>


           </section>

           
           <Separator className='my-4'/>
 
           <section className=" pt-16">

            <h4 className="text-lg w-full text-center font-semibold text-gray-800 tracking-wide mb-4">
              SME IPOs on BSE
            </h4> 

            <Tabs defaultValue="current" className="w-full">
                <TabsList>
                  <TabsTrigger value="current">Current Issues</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming IPOs</TabsTrigger>
                  
                </TabsList>

                <TabsContent value="current">
                  <LiveIposTable/>
                  
                </TabsContent>

                <TabsContent value="upcoming">
                   <ForthIposTable/> 
                </TabsContent>

                
              </Tabs>


           </section>

            
            <Faq/>

            <Script
                    id="faq-schema"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                          {
                            "@type": "Question",
                            "name": "What is GMP?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "GMP (Grey Market Premium) is the unofficial premium at which an IPO’s shares trade before listing. It indicates market sentiment but is not guaranteed."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "What are SME and Mainboard IPOs?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "SME IPO: Smaller companies listed on NSE SME / BSE SME platforms. Mainboard IPO: Larger, well-established companies listed on NSE/BSE mainstream exchanges.  SME IPOs usually have larger lot sizes and higher risk due to lower liquidity."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "What is Offer for Sale (OFS) and Fresh Issue?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Fresh Issue:Company issues new shares → money goes to the company.  OFS: Existing shareholders sell their shares → money goes to them, not the company."
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "How to increase chances of getting IPO allotment in Retail Quota?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": " Always apply  with cut-off price in retail quota. Avoid large bids and  apply single lot from multiple family PANs"
                            }
                          },
                          {
                            "@type": "Question",
                            "name": "How to apply for an IPO?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "You can apply for an IPO via ASBA net banking, UPI-enabled broker apps, or bank apps. A demat account is mandatory."
                            }
                          }
                        ]
                      })
                    }}
                  />


           <Footer/>
            
        </div>  
            
          
          
      </div>
  );
}
