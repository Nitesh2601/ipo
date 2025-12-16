import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
export function Faq () {
 
    return (
        <div className=" bg-gray-200 mt-12 rounded-2xl p-8">   
            <h2 className="w-full text-center text-xl font-bold mb-6"> Frequently Asked Questions (FAQs)</h2>
            <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
            >
            <AccordionItem value="item-1">
                <AccordionTrigger>What is GMP?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    GMP (Grey Market Premium) is the unofficial premium at which an IPO’s shares trade
                    before listing. It indicates market sentiment but is not guaranteed.
                </p>
                 
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>What is PEPRA?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                PEPRA stands for Percentage Estimate Probability of Retail allotment.
                    It represents the estimated percentage chance of getting IPO allotment for retail investors.

                    It’s not an official metric— it is calculated by IPO Hunters and is only an approximation based on subscription data — so it doesn’t guarantee allotment, but helps give a rough idea of the likelihood.
                </p>
                
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>What are SME and Mainboard IPOs?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                   <strong>SME IPO:</strong>  Smaller companies listed on NSE SME / BSE SME platforms.
                </p>
                <p>
                   <strong>Mainboard IPO:</strong>  Larger, well-established companies listed on NSE/BSE mainstream exchanges.
                </p>
                <p>
                   SME IPOs usually have larger lot sizes and higher risk due to lower liquidity.
                </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>What is Offer for Sale (OFS) and Fresh Issue?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                   <strong>Fresh Issue:</strong>  Company issues new shares → money goes to the company.
                </p>
                <p>
                    <strong>OFS:</strong> Existing shareholders sell their shares → money goes to them, not the company.
                </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger>How to apply for an IPO?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                
                 
                 <ul className="list-disc list-inside">
                    <li>Net banking (ASBA option)</li>
                    <li>UPI-enabled Stock Broker apps like Zerodha, Groww, Upstox </li>
                    <li>Bank app with UPI mandate</li>
                </ul>
                  <strong> Having a Demate Account is Mandatory</strong>
              
                
                </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-6">
                <AccordionTrigger>How to increase chances of getting IPO allotment in Retail Quota?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Always apply  with cut-off price in retail quota.
                </p>
                <p>
                  Avoid large bids and  apply single lot from multiple family PANs
                </p>
                
                </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-7">
                <AccordionTrigger>Can I apply from different demat accounts using the same PAN?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  <strong>No.</strong> One PAN = One IPO application.
                </p>
                <p>
                  Multiple applications with the same PAN will be rejected.
                </p>
                </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-8">
                <AccordionTrigger>What is IPO lot size?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Lot size = minimum number of shares you must buy in an IPO.
                </p>
                <p>
                  Example: If lot size is 50 shares, you cannot buy 10 or 20 and you have to apply in multiple of Lot Size.
                </p>
                </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-9">
                <AccordionTrigger>Is it safe to invest in SME IPOs?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  SME IPOs can give high returns but also higher risk due to:
                </p>
              
                <ul className="list-disc list-inside">
                  <li>Low liquidity</li>
                  <li>Smaller company scale</li>
                  <li>High volatility</li>
                </ul>

                
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
                <AccordionTrigger>What is cut-off price vs bid price?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                   Cut-off: Accept whatever final price is decided
                </p>
                <p>
                Bid price: You choose a price within the IPO range <br />
                Retail investors should always choose cut-off to increase the chance of allotement.
                </p>
                </AccordionContent>
            </AccordionItem>

            </Accordion>

            <section className="mt-8">
            <h1 className="w-full text-center text-xl font-semibold mb-12">
              Some Links to Check IPO Allotment
            </h1>

            <div className="flex flex-col md:flex-row items-center md: justify-between gap-3 text-blue-500 underline">
              <a
                href="https://www.bseindia.com/investors/appli_check.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#35a13f] text-white rounded-lg shadow hover:bg-[#2f8f38] transition  no-underline"

              >
                BSE IPO Allotment Status
              </a>

              <a
                href="https://www.nseindia.com/invest/check-trades-bids-verify-ipo-bids"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#35a13f] text-white rounded-lg shadow hover:bg-[#2f8f38] transition  no-underline"
              >
                NSE IPO Allotment Status
              </a>

              <a
                href="https://ipostatus.kfintech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#35a13f] text-white rounded-lg shadow hover:bg-[#2f8f38] transition  no-underline"
              >
                KFinTech IPO Allotment Status
              </a>

              <a
                href="https://in.mpms.mufg.com/Initial_Offer/public-issues.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#35a13f] text-white rounded-lg shadow hover:bg-[#2f8f38] transition  no-underline"
              >
                MUFG IPO Allotment Status
              </a>
            </div>
          </section>

          <section className="mt-8">

          
            <Alert variant="default">
              
              <AlertTitle>DISCLAIMER</AlertTitle>
              <AlertDescription>
                
                <ul className="list-inside list-disc text-sm">
                  <li>IPO Hunters exercises reasonable care in collecting and presenting the information available on this website. Data is sourced from multiple platforms and publicly accessible resources that are considered reliable. However, IPO Hunters does not warrant the accuracy, completeness, or timeliness of any information and shall not be held liable for any errors, omissions, or consequences arising from the use of such content.

                        IPO Hunters expressly states that it holds no financial responsibility toward any user for decisions made based on the information provided on this site.

                        Metrics such as GMP, PEPRA (Probability Estimate of Public Retail Allotment) shown on this platform are approximate, informational, and not official values. They should not be interpreted as predictions, recommendations, guarantees of allotment, or assurances of listing performance.

                        IPO Hunters does not offer stock tips, trading calls, investment recommendations, or personalized financial advice. All information available here is intended solely for general awareness, research, and educational purposes.
                    </li>
                  
                </ul>
              </AlertDescription>
            </Alert>

          </section>



        </div>
    )
}