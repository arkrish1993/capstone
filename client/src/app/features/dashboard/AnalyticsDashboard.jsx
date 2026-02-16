import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import AppShell from "../../layouts/AppShell";
import {
  ADMIN_LINKS,
  CLAIMS_ADJUSTER_LINKS,
  REINSURER_ANALYST_LINKS,
  UNDERWRITER_LINKS,
} from "../../common/constants";
import ChartCard from "../../shared/ChartCard";
import ExposureBarChart from "../../features/dashboard/charts/ExposureBarChart";
import ReinsurerPieChart from "../../features/dashboard/charts/ReinsurerPieChart";
import LossRatioRadial from "../../features/dashboard/charts/LossRatioRadial";
import MonthlyClaimsLine from "../../features/dashboard/charts/MonthlyClaimsLine";
import RetentionPieChart from "../../features/dashboard/charts/RetentionPieChart";
import HighClaimBarChart from "../../features/dashboard/charts/HighClaimBarChart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const getLinks = (role) => {
  switch (role) {
    case "ADMIN":
      return ADMIN_LINKS;
    case "UNDERWRITER":
      return UNDERWRITER_LINKS;
    case "CLAIMS_ADJUSTER":
      return CLAIMS_ADJUSTER_LINKS;
    case "REINSURANCE_ANALYST":
      return REINSURER_ANALYST_LINKS;
    default:
      return [];
  }
};

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [lob, setLob] = useState([]);
  const [reinsurer, setReinsurer] = useState([]);
  const [lossRatio, setLossRatio] = useState(null);
  const [claimsTrend, setClaimsTrend] = useState([]);
  const [retention, setRetention] = useState(null);
  const [highClaims, setHighClaims] = useState([]);
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [lobRes, reinsurerRes, lossRes, trendRes, retentionRes, highRes] =
          await Promise.all([
            api.get("/analytics/exposure-lob"),
            api.get("/analytics/reinsurer-distribution"),
            api.get("/analytics/loss-ratio"),
            api.get("/analytics/monthly-claims"),
            api.get("/analytics/retention-vs-ceded"),
            api.get("/analytics/high-claim-policies"),
          ]);

        setLob(lobRes.data);
        setReinsurer(reinsurerRes.data);
        setLossRatio(lossRes.data);
        setClaimsTrend(trendRes.data);
        setRetention(retentionRes.data);
        setHighClaims(highRes.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  const links = getLinks(loggedInUser?.user?.role);

  if (!links.length) {
    navigate("/login");
  }

  return (
    <AppShell links={links}>
      <div
        className="row p-4"
        style={{ marginTop: "-1rem", backgroundColor: "darkslategrey" }}
      >
        <h3 className="mb-4 text-success text-white">Analytics Dashboard</h3>

        <ChartCard
          title="Top 5 High Claim Policies"
          hasData={highClaims?.length > 0}
        >
          <HighClaimBarChart data={highClaims} />
        </ChartCard>

        <ChartCard
          title="Monthly Claims Trend"
          hasData={claimsTrend?.length > 0}
        >
          <MonthlyClaimsLine data={claimsTrend} />
        </ChartCard>

        <ChartCard
          title="Exposure by Line of Business"
          hasData={lob?.length > 0}
        >
          <ExposureBarChart data={lob} />
        </ChartCard>

        <ChartCard
          title="Reinsurer Distribution"
          hasData={reinsurer?.length > 0}
        >
          <ReinsurerPieChart data={reinsurer} />
        </ChartCard>

        <ChartCard title="Loss Ratio" hasData={!!lossRatio}>
          <LossRatioRadial value={lossRatio.lossRatioPercentage} />
        </ChartCard>

        <ChartCard title="Retention vs Ceded" hasData={!!retention}>
          <RetentionPieChart
            retained={retention.totalRetained}
            ceded={retention.totalCeded}
          />
        </ChartCard>
      </div>
    </AppShell>
  );
}
