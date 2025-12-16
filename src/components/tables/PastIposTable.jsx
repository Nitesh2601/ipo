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
    return res.data; // {data, total, totalPages}
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["past-ipos", page],
    queryFn: fetchIpos,
    keepPreviousData: true,
  });

  if (isLoading) return "Loading IPOs...";
  if (error) return "Error loading IPOs";

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
