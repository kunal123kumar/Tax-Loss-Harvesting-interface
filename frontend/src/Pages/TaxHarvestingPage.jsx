
import TaxHarvestingHeader from "../Components/TaxHarvestingHeader";
import DisclaimerAccordion from "../Components/DisclaimerAccordion";
import TaxHarvestingDashboard from "../Components/TaxHarvestingDashboard";

const TaxHarvestingPage = () => {
  return (
    <div
      className="
        min-h-screen p-4 md:p-10 font-sans
        bg-slate-50 dark:bg-gray-800
        text-slate-800 dark:text-gray-200
      "
    >
      <div className="max-w-6xl mx-auto">
        <TaxHarvestingHeader />
        <DisclaimerAccordion />
        <TaxHarvestingDashboard />
      </div>
    </div>
  );
};

export default TaxHarvestingPage;