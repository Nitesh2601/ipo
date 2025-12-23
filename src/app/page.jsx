
import HomeClient from "@/app/HomeClient";
import IpoSeoContent from "@/components/seo/IpoSeoContent";

export default function Page() {
  return (
    <>
      {/* SEO-only server content */}
      <IpoSeoContent />

      {/* Your existing UI */}
      <HomeClient />
    </>
  );
}
