// src/App.jsx
import { useContext } from 'react';
import { CampaignContext } from './context/CampaignContext';
import Step1CampaignInfo from './component/Step1CampaignInfo';
import Step2AudienceSegment from './component/Step2AudienceSegment';
import Step3MessageEditor from './component/Step3MessageEditor';
import Step4Schedule from './component/Step4Schedule';
import Step5Review from './component/Step5Review';
import ProgressStepper from './component/ProgressStepper';
// import './styles/index.css';
import { Routes, Route } from 'react-router-dom';
function App() {
  const { step } = useContext(CampaignContext);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1CampaignInfo />;
      case 2:
        return <Step2AudienceSegment />;
      case 3:
        return <Step3MessageEditor />;
      case 4:
        return <Step4Schedule />;
      case 5:
        return <Step5Review />;
      default:
        return <Step1CampaignInfo />;
    }
  };

  return (
    <div className="app-container">
      <h1>Campaign Builder</h1>
      <ProgressStepper currentStep={step} />
      <div className="form-container">{renderStep()}</div>
    </div>
  );
}

export default App;