// SERVER COMPONENT (default)
import { getCurrentIpos, getUpcomingIpos, getBseIpos } from "@/lib/seoIpo";

export default async function IpoSeoContent() {
  const [current, upcoming, bseIpos] = await Promise.all([
    getCurrentIpos(),
    getUpcomingIpos(),
    getBseIpos()
  ]);

  
  return (
    <section aria-hidden="true" className="sr-only">
      <h2>Current and Upcoming IPOs in India</h2>

      <ul>
        {current.map((ipo) => (
          <li key={ipo.id}>
            <strong>{ipo.companyName}</strong> IPO GMP, price band, lot size,
            allotment status and listing details on IPO Hunters.
          </li>
        ))}

        {upcoming.map((ipo) => (
          <li key={ipo.id}>
            <strong>{ipo.companyName}</strong> upcoming IPO details, expected GMP,
            issue date and listing details on IPO Hunters .
          </li>
        ))}

        {bseIpos.map((ipo) => (

            <li key = {ipo.id}>
               <strong>{ipo.companyName}</strong>IPO GMP, price band, lot size,
              allotment status and listing details on IPO Hunters.
            </li>
        ))}


      </ul>
    </section>
  );
}


