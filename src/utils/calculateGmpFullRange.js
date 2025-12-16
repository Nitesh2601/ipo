export function calculateGmpFullRange  (gmp, priceRange)  {
    if (!gmp || !priceRange) return null;
  
    const numbers = priceRange.match(/\d+(\.\d+)?/g);
    if (!numbers || numbers.length === 0) return null;
  
    // get highest number in the price range
    const highPrice = Math.max(...numbers.map(Number));
  
    const percent = (gmp / highPrice) * 100;
  
    const percentLower = percent - 2.5;
    const percentUpper = percent + 2.5;
  
    const rsLower = (highPrice * percentLower) / 100;
    const rsUpper = (highPrice * percentUpper) / 100;
  
    return {
      percentLower: percentLower.toFixed(2),
      percentUpper: percentUpper.toFixed(2),
      actualPercent: percent.toFixed(2),
  
      rsLower: rsLower.toFixed(2),
      rsUpper: rsUpper.toFixed(2),
      actualRs: gmp.toFixed(2),
    };
  };
  

  export const cleanText = (value) => {
    if (typeof value !== "string") return value;
    return value.replace(/^"+|"+$/g, "").trim();
  };
  

  export const formatLeadManagers = (value) => {
    if (!value || typeof value !== "string") return [];
  
    return value
      .replace(/^"+|"+$/g, "")      // remove wrapping quotes
      .split(",")                   // split by comma
      .map(item => item.trim())     // trim spaces
      .filter(Boolean);             // remove empty values
  };
  