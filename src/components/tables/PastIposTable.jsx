"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";

export function PastIpoTable() {
  const [page, setPage] = useState(1);

  const fetchIpos = async ({ queryKey }) => {
    const [_key, page] = queryKey;
      const res = await axios.get(`/api/pastIpo?page=${page}`);
      // Expecting { data, total, totalPages }
      return res.data ?? { data: [], total: 0, totalPages: 0 };
  };
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["past-ipos", page],
    queryFn: fetchIpos,
  
    // 🔥 CACHING & STABILITY OPTIONS
    staleTime: 5 * 60 * 1000,        // cache fresh for 5 min
    cacheTime: 10 * 60 * 1000,       // keep in memory for 10 min
    refetchOnWindowFocus: false,     // no refetch on tab switch
    retry: 2,                        // retry twice if API fails
    retryDelay: 1000,                // 1 second between retries
    keepPreviousData: true,          // keep old data while fetching new page
  });
  
  if (isLoading) return "Loading past IPOs...";
  if (error) return "Error loading past IPOs";
  

  return (
    <>
    <section
      aria-labelledby="past-ipos-heading"
    >

    {/* 🔹 Hidden SEO heading */}
    <h2
        id="past-ipos-heading"
        className="sr-only"
      >
        Past IPOs in India – Historical IPO Listing Data
      </h2>

      {/* 🔹 Hidden description */}
      <p className="sr-only">
        Browse past IPOs in India including issue price, price band,
        issue dates and listing dates for both mainboard and SME IPOs.
        This section provides historical IPO information for reference.
      </p>


      <Table>
        <TableCaption>Past IPOs </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Security Type</TableHead>
            <TableHead>Price Range</TableHead>
            <TableHead>IssuePrice</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Listing Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.data.map((ipo, index) => (
            <TableRow
              key={ipo.symbol}
              className={`cursor-pointer hover:bg-gray-100 ${
                  ipo.securityType === "EQ" ? "bg-blue-50 hover:bg-blue-100" : "bg-yellow-50 hover:bg-yellow-100"
                }`}
            >
              <TableCell>
                <strong>{(page - 1) * 10 + index + 1}.</strong>{" "}
                {ipo.company ?? "N/A"}
              </TableCell>

              <TableCell>{ipo.symbol ?? "N/A"}</TableCell>

              <TableCell>
                {ipo.securityType === "EQ" ? "Mainboard" : "SME"}
              </TableCell>

              <TableCell>{ipo.priceRange ?? "N/A"}</TableCell>
              <TableCell>{ipo.issuePrice ?? "N/A"}</TableCell>
              <TableCell>{ipo.ipoStartDate ?? "N/A"}</TableCell>
              <TableCell>{ipo.ipoEndDate ?? "N/A"}</TableCell>
              <TableCell>{ipo.listingDate ?? "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>Total IPOs: 100</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
     </section>

      <div className="flex items-center gap-4 mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-[#35a13f] text-white  hover:bg-[#2f8f38] cursor-pointer disabled:opacity-50"
        >
          Previous
        </Button>

        <span>
          Page {page} of {data.totalPages}
        </span>

        <Button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-[#35a13f] text-white  hover:bg-[#2f8f38] cursor-pointer disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </>
  );
}
