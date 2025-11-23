import axios from "axios";

// Function to fetch from NSE with required headers
async function fetchNSE(url) {
  return axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://www.nseindia.com",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Connection": "keep-alive"
    }
  });
}


// Only keep these titles
const allowedTitles = [
  
  "Symbol",
  "Issue Period",
  "Issue Size",
  "Issue Type",
  "Price Range",
  "Face Value",
  "Bid Lot",
  "Minimum Order Quantity",
  "Maximum Subscription Amount for Retail Investor",
  "Maximum Bid Quantity for QIB Investors",
  "Maximum Bid Quantity for NIB Investors",
  "Book Running Lead Managers",
  "Sponsor Bank"
];

export async function GET() {
  try {
    // 1. Fetch current issue IPO list
    const listRes = await fetchNSE("https://www.nseindia.com/api/ipo-current-issue");
    const ipoList = listRes.data;

    let finalData = [];

    // 2. Fetch details for each IPO
    for (let ipo of ipoList) {
      const symbol = ipo.symbol;
      const detailUrl = `https://www.nseindia.com/api/ipo-detail?symbol=${symbol}&series=EQ`;

      try {
        const detailRes = await fetchNSE(detailUrl);


        // Filter dataList
      const filteredDataList = detailRes.data.issueInfo.dataList.filter(item => 
        item.title && allowedTitles.includes(item.title)
      );

        // Extract only needed fields
        // Build trimmed detail object with filtered list
        const trimmedDetail = {
          companyName: detailRes.data.companyName,
          issueInfo: {
            ...detailRes.data.issueInfo,
            dataList: filteredDataList
          },
          activeCat: detailRes.data.activeCat
        };

        const findRetailer = detailRes.data.activeCat.dataList.find((c)=> c.srNo == '3');
        const findProbability = ((1 / findRetailer.noOfTotalMeant) * 100).toFixed(2);

        finalData.push({
          ...ipo,
          detail: trimmedDetail,
          gmp: null,
          probability: findProbability
          
        });

      } catch (err) {
        finalData.push({
          ...ipo,
          detail: null
        });
      }
    }

    // console.log("Final IPO Details:", finalData);
    return Response.json(finalData);

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
