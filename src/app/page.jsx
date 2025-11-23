
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrentIssuesTable } from "@/components/tables/CurrentIssuesTable";

export default function Home() {
  return (
      <div className="p-6 mx-auto space-y-6 min-w-full">
           <section className=" w-full flex justify-center items-center pt-28">
              <h1 className=" text-amber-500 text-4xl">Make your ipo anlysis easier with ipo hunter</h1>
           </section>

           <div className=" pl-8">

            <Tabs defaultValue="current" className="w-full">
                <TabsList>
                  <TabsTrigger value="current">Current Issues</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming IPOs</TabsTrigger>
                  <TabsTrigger value="past">Past IPOs</TabsTrigger>
                </TabsList>

                <TabsContent value="current">
                  <CurrentIssuesTable/>
                  
                </TabsContent>

                <TabsContent value="upcoming">
                  {/* <UpcomingIposTable data={upcomingIpos} /> */}
                  upcoming ipos
                </TabsContent>

                <TabsContent value="past">
                  {/* <PastIposTable data={pastIpos} /> */}
                  past ipos
                </TabsContent>
              </Tabs>


           </div>



      </div>
  );
}
