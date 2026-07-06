import Hero from "../components/dashboard/Hero";
import MetricCards from "../components/dashboard/MetricCards";
import AIInsights from "../components/dashboard/AIInsights";
import QuickActions from "../components/dashboard/QuickActions";
import RecentAlerts from "../components/dashboard/RecentAlerts";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {

  const {
    loading,
    system,
    stats,
  } = useDashboard();
  

  return (
    <div className="min-h-screen bg-[#020617]">

   <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">

        <Hero
          system={system}
          loading={loading}
        />

        <MetricCards
          system={system}
          stats={stats}
          loading={loading}
        />

       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <div className="xl:col-span-2">

            <PerformanceChart
              system={system}
              loading={loading}
            />

          </div>

          <AIInsights
            system={system}
            stats={stats}
            loading={loading}
          />

        </div>
<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <QuickActions />

          <RecentAlerts />

        </div>

        <ActivityTimeline />

      </div>

    </div>
  );
}