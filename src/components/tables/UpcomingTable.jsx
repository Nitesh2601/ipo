"use client";
import { Separator } from "@/components/ui/separator"
import { calculateGmpFullRange } from "@/utils/calculateGmpFullRange";
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

export function UpcomingTable() {
  const [selectedIpo, setSelectedIpo] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const fetchIpos = async () => {
    try {
      const res = await axios.get("/api/upcoming");
      return res.data?.data || []; // always return array to prevent errors
    } catch (err) {
      console.error("Failed to fetch upcoming IPOs:", err);
      return []; // safe fallback
    }
  };
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["upcoming-ipos"],
    queryFn: fetchIpos,
  
    // 🔥 CACHING & STABILITY
    staleTime: 5 * 60 * 1000,        // cache considered fresh for 5 min
    cacheTime: 10 * 60 * 1000,       // keep in memory for 10 min even if unmounted
    refetchOnWindowFocus: false,     // don't refetch when user switches tabs
    retry: 2,                        // retry twice if API fails (Supabase wake-up)
    retryDelay: 1000,                // 1 second between retries
  });
  
  if (isLoading) return "Loading upcoming IPOs...";
  if (error) return "Error loading upcoming IPOs";
  
  return (
    <>
      {/* 🔹 SEO Semantic Wrapper */}

    <section
      aria-labelledby="upcoming-ipos-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    
    >  

       {/* 🔹 Invisible but crawlable SEO heading */}
      <h2
        id="upcoming-ipos-heading"
        className="sr-only"
        itemProp="name"
      >
        Upcoming IPOs in India – IPO Calendar & GMP
      </h2>

      {/* 🔹 Invisible SEO description */}
      <p className="sr-only" itemProp="description">
        Explore upcoming IPOs in India with expected issue dates,
        IPO price band, lot size, issue size and grey market premium (GMP).
        This IPO calendar includes both mainboard and SME IPOs.
      </p>

      {/* 🔹 Upcoming IPOs Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Upcoming IPOs in India",
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
        <TableCaption>Upcoming IPOs </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>GMP</TableHead>
            <TableHead>Lot Size</TableHead>
            <TableHead>Price</TableHead>
            
            <TableHead>IssueSize</TableHead>
            <TableHead>IssuePeriod</TableHead>
            
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((ipo) => (
            <TableRow
              key={ipo.symbol}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Organization"
              className={`cursor-pointer hover:bg-gray-100 ${
                ipo.series === "EQ" ? "bg-blue-50 hover:bg-blue-100" : "bg-yellow-50 hover:bg-yellow-100"
              }`}
              title="Click to show more details" 
              onClick={() => {
                setSelectedIpo(ipo);
                setOpen(true);
              }}
            >
              <TableCell itemProp="name">
                 {ipo.companyName ?? "N/A"}
              </TableCell>
              
              <TableCell>{ipo.series ==='EQ'?" Mainboard" :'SME'  ?? "N/A"}</TableCell>
              <TableCell>
                {ipo.gmp && ipo.issuePrice ? (() => {
                  const r = calculateGmpFullRange(ipo.gmp, ipo.issuePrice);
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
              <TableCell>{ipo.minOrderQty ?? ipo.bidLot?? "N/A"}</TableCell>
              <TableCell>{ipo.issuePrice ?? "N/A"}</TableCell>
              
              <TableCell>{ipo.issueSize ? `${ipo.issueSize} Shares` : "N/A"}</TableCell>

              <TableCell>{ipo.issuePeriod ?? "N/A"}</TableCell>
              
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
            
                  
           
            <Separator className="my-4" />
            <strong className="block pt-6 mb-4 text-gray-700">Other Details</strong>

            {[
                { title: "Issue Size", value: selectedIpo?.issueSizeRs },
                { title: "Issue Period", value: selectedIpo?.issuePeriod },
                { title: "Issue Type", value: selectedIpo?.issueType },
                { title: "Price Range", value: selectedIpo?.priceRange },
                
                { title: "Face Value", value: selectedIpo?.faceValue },
                { title: "Bid Lot", value: selectedIpo?.bidLot },
                { title: "Minimum Order Qty", value: selectedIpo?.minOrderQty },
                { title: "Max Retail Amount", value: selectedIpo?.maxRetailAmt },
                { title: "Max QIB Qty", value: selectedIpo?.maxQibQty },
                { title: "Max NIB Qty", value: selectedIpo?.maxNibQty },
                { title: "Lead Managers", value: selectedIpo?.leadManagers },
                { title: "Sponsor Bank", value: selectedIpo?.sponsorBank },
                
                
            ].map((item, index) => (
                <div key={index} className="flex justify-between border-b py-2 px-2">
                <span className="font-medium">{item.title}</span>
                <span className="text-right">{item.value ?? "N/A"}</span>
                </div>
            ))}
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
