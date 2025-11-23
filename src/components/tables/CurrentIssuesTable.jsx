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

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function CurrentIssuesTable() {

    const [selectedIpo, setSelectedIpo] = React.useState(null);
     const [open, setOpen] = React.useState(false);

  const fetchIpos = async () => {
    const res = await axios.get("/api/basic");
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["current-ipos"],
    queryFn: fetchIpos,
  });

  if (isLoading) return "Loading IPOs...";
  if (error) return "Error loading IPOs";

  const getBidLot = (ipo) => {
    const list = ipo?.detail?.issueInfo?.dataList;
    if (!Array.isArray(list)) return "N/A";
  
    const bidLotItem = list.find((item) => item.title === "Bid Lot");
    if (!bidLotItem) return "N/A";
  
    const text = bidLotItem.value;
  
    // Extract "25 Equity Shares"
    const match = text.match(/^(\d+)\s*Equity Shares/i);
  
    return match ? match[0] : "N/A";
  };
  
  

  return (
       <>
            <Table>
            <TableCaption>Current IPO Issues</TableCaption>

            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>GMP</TableHead>
                <TableHead>Lot Size</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead 
                    title="Estimated probability of retail allotment"
                    className="cursor-help"
                    >
                    EPRA
                    </TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((ipo) => (
                <TableRow  
                key={ipo.symbol}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                    setSelectedIpo(ipo);
                    setOpen(true);
                }}>
                    <TableCell>{ipo.companyName}</TableCell>

                    <TableCell>{ipo.gmp ? ipo.gmp : "N/A"}</TableCell>

                    <TableCell>
                    {getBidLot(ipo)}
                    </TableCell>

                    <TableCell>{ipo.issuePrice || "N/A"}</TableCell>

                    <TableCell>{ipo.noOfTime ? `${Number(ipo.noOfTime).toFixed(2)} x` : "0"}</TableCell>

                    <TableCell>{ipo.probability ? ipo.probability + "%" : "N/A"}</TableCell>

                    <TableCell>{ipo.issueStartDate}</TableCell>

                    <TableCell>{ipo.issueEndDate}</TableCell>
                </TableRow>
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                <TableCell colSpan={8}>
                    Total IPOs: {data.length}
                </TableCell>
                </TableRow>
            </TableFooter>
            </Table>


            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent  className="w-[90vw] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                        {selectedIpo?.companyName || "IPO Details"}
                        </DialogTitle>
                        <DialogDescription>
                        Detailed information about this IPO.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedIpo?.detail?.issueInfo?.dataList?.map((item, index) => (
                        <div key={index} className="flex justify-between border-b py-2">
                        <span className="font-medium">{item.title || "—"}</span>
                        <span
                            className="text-right"
                            dangerouslySetInnerHTML={{ __html: item.value || "N/A" }}
                        />
                        </div>
                    ))}
                </DialogContent>
            </Dialog>


    
        </>
  );
}
