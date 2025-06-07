// src/components/Step1CampaignInfo.jsx
import { useContext, useState } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import Button from './common/Button';
import Input from './common/Input';

const Step1CampaignInfo = () => {
  const { campaign, updateCampaign, nextStep } = useContext(CampaignContext);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCampaign('step1', { [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!campaign.step1.campaignName.trim()) {
      newErrors.campaignName = 'Campaign name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <h2>Campaign Information</h2>
      <div className="form-group">
        <Input
          label="Campaign Name *"
          name="campaignName"
          value={campaign.step1.campaignName}
          onChange={handleChange}
          error={errors.campaignName}
        />
      </div>
      <div className="form-group">
        <Input
          label="Campaign Description"
          name="campaignDescription"
          value={campaign.step1.campaignDescription}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </div>
      <div className="button-group">
        <Button onClick={handleNext} disabled={!campaign.step1.campaignName.trim()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1CampaignInfo;