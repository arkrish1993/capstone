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
  if (!links.length) navigate("/login");

  return (
    <AppShell links={links}>
      <div className="container-fluid py-4">
        <div className="mb-4">
          <h3 className="fw-semibold mb-1">Analytics Dashboard</h3>
          <p className="text-muted mb-0">
            Overview of policies, claims, and reinsurance metrics
          </p>
        </div>

        <div className="row g-4">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <ChartCard
              title="Top 5 High Claim Policies"
              hasData={highClaims?.length > 0}
            >
              <HighClaimBarChart data={highClaims} />
            </ChartCard>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <ChartCard
              title="Monthly Claims Trend"
              hasData={claimsTrend?.length > 0}
            >
              <MonthlyClaimsLine data={claimsTrend} />
            </ChartCard>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <ChartCard
              title="Exposure by Line of Business"
              hasData={lob?.length > 0}
            >
              <ExposureBarChart data={lob} />
            </ChartCard>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <ChartCard
              title="Reinsurer Distribution"
              hasData={reinsurer?.length > 0}
            >
              <ReinsurerPieChart data={reinsurer} />
            </ChartCard>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <ChartCard title="Loss Ratio" hasData={!!lossRatio}>
              <LossRatioRadial value={lossRatio?.lossRatioPercentage} />
            </ChartCard>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <ChartCard title="Retention vs Ceded" hasData={!!retention}>
              <RetentionPieChart
                retained={retention?.totalRetained}
                ceded={retention?.totalCeded}
              />
            </ChartCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
