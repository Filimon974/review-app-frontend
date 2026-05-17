import MainLayout from "../layouts/MainLayout";

import HeroSection from "../components/HeroSection";

import TrendingSection from "../components/TrendingSection";

// import RecentReviewsSection
//   from "../components/RecentReviewsSection";

import TrendingReviewsSection
  from "../components/TrendingReviewsSection";



function Home() {

  return (

    <MainLayout>

      <HeroSection />



      <div className="mt-20 md:mt-28">

        <TrendingSection />

      </div>



      {/* <RecentReviewsSection /> */}



      <TrendingReviewsSection />

    </MainLayout>

  );

}

export default Home;