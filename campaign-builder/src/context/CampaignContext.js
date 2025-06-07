// src/context/CampaignContext.js
import { createContext, useState } from 'react';
export const CampaignContext = createContext();
export const CampaignProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [campaign, setCampaign] = useState({
    step1: {
      campaignName: '',
      campaignDescription: '',
    },
    step2: {
      audienceType: 'All Users',
      customFilters: {
        platforms: [],
        country: '',
        signupDateRange: { start: null, end: null },
      },
    },
    step3: {
      channel: 'Email',
      message: '',
    },
    step4: {
      scheduleType: 'Send Now',
      scheduledTime: null,
    },
  });

  const updateCampaign = (step, data) => {
    setCampaign(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <CampaignContext.Provider
      value={{
        step,
        campaign,
        updateCampaign,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};