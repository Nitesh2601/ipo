"use client";


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

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { calculateGmpFullRange } from "@/utils/calculateGmpFullRange";
export function LiveIposTable() {
  

  const fetchIpos = async () => {
    try {
      const res = await axios.get("/api/bseSmeLive");
      return res.data?.data || []; // always return array to prevent UI errors
    } catch (err) {
      console.error("Failed to fetch BSE SME Live IPOs:", err);
      return []; // safe fallback
    }
  };
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["bseLive-ipos"],
    queryFn: fetchIpos,
  
    // 🔥 CACHING & STABILITY OPTIONS
    staleTime: 5 * 60 * 1000,        // cache considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,       // keep in memory for 10 minutes even if unmounted
    refetchOnWindowFocus: false,     // don't refetch when tab is focused
    retry: 2,                        // retry twice if API fails (Supabase wake-up)
    retryDelay: 1000,                // 1 second between retries
  });
  
  if (isLoading) return "Loading IPOs...";
  if (error) return "Error loading IPOs";
  

  return (
    <>
    <section
    aria-labelledby="live-sme-ipos-heading"
    itemScope
    itemType="https://schema.org/ItemList"
    >  
      {/* 🔹 Hidden SEO Heading */}
  <h2
    id="live-sme-ipos-heading"
    className="sr-only"
    itemProp="name"
  >
    Live SME IPOs GMP Today – Current BSE SME IPO List
  </h2>

  {/* 🔹 Hidden SEO Description */}
  <p className="sr-only" itemProp="description">
    View live SME IPOs in India listed on BSE SME platform with
    updated Grey Market Premium (GMP), subscription status,
    price band, face value, and issue dates.
  </p>

  {/* 🔹 Structured Data (Lightweight) */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Live SME IPOs GMP List",
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
        <TableCaption>Current SME Issues</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Security Type</TableHead>
            <TableHead>GMP</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Face Value</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((ipo) => (
            <TableRow
              key={ipo.ipoNo}
              className={`cursor-pointer hover:bg-gray-100 ${
                  ipo.series === "EQ" ? "bg-blue-50 hover:bg-blue-100" : "bg-yellow-50 hover:bg-yellow-100"
                }`}
              
            >
              <TableCell>{ipo.companyName ?? "N/A"} <br />  </TableCell>
                       
              
              <TableCell>{ipo.series ?? "N/A"}</TableCell>
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
              <TableCell className='text-blue-700'>{`${ipo.totalSubscription.toFixed(2)} x`?? "N/A"}</TableCell>
              <TableCell>{ipo.priceRange ?? "N/A"}</TableCell>
              <TableCell>{ipo.faceValue ?? "N/A"}</TableCell>
              
              
              <TableCell>{ipo.issueStartDate? new Date(ipo.issueStartDate).toLocaleDateString(): "N/A"}</TableCell>
              <TableCell>{ipo.issueEndDate? new Date(ipo.issueEndDate).toLocaleDateString() :"N/A"}</TableCell>
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
      
    </>
  );
}
