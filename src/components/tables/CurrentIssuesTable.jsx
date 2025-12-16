"use client";
import { Separator } from "@/components/ui/separator"
import { MessageSquare } from "lucide-react";

import { CommentsDrawer } from "@/components/CommentsDrawer";
import { calculateGmpFullRange } from "@/utils/calculateGmpFullRange";
import { useSession } from "next-auth/react";


import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cleanText } from "@/utils/calculateGmpFullRange";
import { formatLeadManagers } from "@/utils/calculateGmpFullRange";

export function CurrentIssuesTable() {
  const [selectedIpo, setSelectedIpo] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openCommentsModal, setOpenCommentsModal] = React.useState(false);
  
  const {data : session} = useSession();
  

  const fetchIpos = async () => {
    const res = await axios.get("/api/basic");
    return res.data.data || []; // adjust if API returns { success, data }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["current-ipos"],
    queryFn: fetchIpos,
  });

  if (isLoading) return "Loading IPOs...";
  if (error) return "Error loading IPOs";
    
 

  
  

  return (
    <>

    <section
      aria-labelledby="current-ipos-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >

      {/* 🔹 Invisible but crawlable SEO heading */}
      <h2
        id="current-ipos-heading"
        className="sr-only"
        itemProp="name"
      >
        Current IPO GMP Today – Live IPO Grey Market Premium
      </h2>

      {/* 🔹 Invisible SEO description */}
      <p className="sr-only" itemProp="description">
        View current IPOs in India with live Grey Market Premium (GMP),
        subscription status, lot size, price band, and important dates.
        Data includes mainboard and SME IPOs updated regularly.
      </p>

      {/* 🔹 IPO List Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Current IPO GMP List",
            itemListElement: data.map((ipo, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: ipo.companyName,
              url: "https://ipohunters.com",
            })),
          }),
        }}
      />


      <Table>
        <TableCaption>Current IPO Issues</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Security Type</TableHead>
            <TableHead>GMP</TableHead>
            <TableHead >Lot Size</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead title="% of Estimated probability of retail allotment" className="cursor-help">PEPRA</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((ipo) => (
            
            <TableRow
              key={ipo.symbol}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className={`cursor-pointer hover:bg-gray-100 ${
                  ipo.series === "EQ" ? "bg-blue-50 hover:bg-blue-100"  : "bg-yellow-50  hover:bg-yellow-100"
                }`}
              onClick={() => {
                setSelectedIpo(ipo);
                setOpen(true);
              }}
            >
              
        
              <TableCell itemProp="name">
                {ipo.companyName ?? "N/A"} <br />
                ({ipo.symbol ?? "N/A"}) <br />

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIpo(ipo);
                    
                    setOpenCommentsModal(true);
                  }}
                  className="inline-flex items-center gap-1 cursor-pointer group"
                >
                  <span className="text-gray-600 group-hover:text-black">
                    Comments
                  </span>

                  <MessageSquare className="h-4 w-4 text-gray-600 group-hover:text-black" />
                </div>
              </TableCell>



              <TableCell>
                {ipo.series
                  ? ipo.series === "EQ"
                    ? "Mainboard"
                    : ipo.series
                  : "N/A"}
              </TableCell>
              <TableCell>
                {ipo.gmp && ipo.priceRange ? (() => {
                  const r = calculateGmpFullRange(ipo.gmp, ipo.priceRange);
                  if (!r) return "N/A";

                  const isPositive = ipo.gmp > 0;

                  const colorClass = isPositive
                    ? "text-[#0A8A55]"     // stock market green
                    : "text-[#FF4D4F]";    // stock market red

                  return (
                    <div className={`text-sm leading-tight ${colorClass}`}>

                        {/* Rs Range */}
                        ₹{r.rsLower} – ₹{r.rsUpper}  <br />

                      {/* Percentage Range */}
                       ({r.percentLower}% – {r.percentUpper}%)

                      
                    </div>
                  );
                })() : "N/A"}
              </TableCell>


              <TableCell >{ipo.minOrderQty ?? ipo.bidLot?? "N/A"}</TableCell>
              <TableCell>{ipo.priceRange ?? "N/A"}</TableCell>
              {/* <TableCell className="text-blue-600"> {`${ipo.noOfTime.toFixed(2)} x` ?? "N/A"}</TableCell> */}
              <TableCell className="text-blue-600">
                  {ipo.series
                      ? ipo.series === "EQ"
                        ? `${ipo.noOfTime.toFixed(2)} x`
                        : `${ipo.noOfTimeSme.toFixed(2)} x`
                      : "N/A"}
               </TableCell>
              <TableCell className="text-purple-600">{ipo.probability ? `${Math.min(ipo.probability, 100).toFixed(2)}%` : "N/A"}</TableCell>
              <TableCell>{ipo.issueStartDate ?? "N/A"}</TableCell>
              <TableCell>{ipo.issueEndDate ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>Total IPOs: {data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

    </section>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedIpo?.companyName || "IPO Details"}</DialogTitle>
            <DialogDescription>Detailed information about this IPO.</DialogDescription>
          </DialogHeader>

          {/* Subscription Categories */}
                
          <div className="mt-4">
            
                  
            {selectedIpo?.series === 'EQ' && (
             <>
              <strong className="block mb-2 text-gray-700">Subscription Table</strong>
              <Table>
                <TableCaption>Subscription Table</TableCaption>

                <TableHeader>
                  <TableRow>
                    <TableHead>Categories</TableHead>
                    <TableHead>ShareOffered</TableHead>
                    <TableHead>SharesBid</TableHead>
                    <TableHead>Subscription</TableHead>
                    
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {selectedIpo?.SubscriptionCategory.map((cat) => (
                    <TableRow
                      key={cat.srNo}
                      className="cursor-pointer hover:bg-gray-100"
  
                    >
                      <TableCell>{cat.category ?? "N/A"}</TableCell>
                      <TableCell>{cat.noOfShareOffered?? "N/A"}</TableCell>
                      <TableCell>{cat.noOfSharesBid?? "N/A"}</TableCell>
                      <TableCell className='text-blue-700'>{`${cat.noOfTotalMeant.toFixed(2)} x` ?? "N/A"}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>

      
            </Table>
            </>
            )}
            <Separator className="my-4" />
            <strong className="block pt-6 mb-4 text-gray-700">Other Details</strong>

            {[  
                { title: "Issue Size", value: selectedIpo?.issueSize },
                { title: "Issue Period", value: selectedIpo?.issuePeriod },
                { title: "Issue Type", value: selectedIpo?.issueType },
                { title: "Price Range", value: selectedIpo?.priceRange },
                
                { title: "Face Value", value: selectedIpo?.faceValue },
                { title: "Bid Lot", value: selectedIpo?.bidLot },
                { title: "Minimum Order Quantity", value: selectedIpo?.minOrderQty },
                { title: "Max Retail Amount", value: selectedIpo?.maxRetailAmt },
                { title: "Max QIB Quantity", value: selectedIpo?.maxQibQty },
                { title: "Max NIB Quantity", value: selectedIpo?.maxNibQty },
                { title: "Lead Managers", value: selectedIpo?.leadManagers },
                { title: "Sponsor Bank", value: selectedIpo?.sponsorBank },
                
                
            ].map((item, index) => (
                <div key={index} className="flex justify-between border-b py-2 px-2">
                  <span className="  font-medium">{item.title}</span>
                  {item.title === "Lead Managers" ? (
                        <div className="flex flex-wrap gap-2 justify-end text-right">
                          {formatLeadManagers(item.value).map((manager, i) => (
                            <div
                              key={i}
                              className="text-sm bg-gray-100 px-2 py-1 rounded"
                            >
                              {manager}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-right">
                          {item.value ? cleanText(item.value) : "N/A"}
                        </span>
                      )}

                </div>
            ))}
            </div>
        </DialogContent>
      </Dialog>

      {/* commentbox */}

       <CommentsDrawer selectedIpo={selectedIpo} open={openCommentsModal} setOpen={setOpenCommentsModal}/>

    </>
  );
}
