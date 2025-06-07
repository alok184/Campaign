// src/components/Step2AudienceSegment.jsx
import { useContext, useState } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import SelectDropdown from '../context/SelectDropdown';
import Button from './common/Button';
import Input from './common/Input';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const audienceOptions = [
  'All Users',
  'New Users (Signed up in last 7 days)',
  'Inactive Users (No activity in last 30 days)',
  'Custom Segment',
];

const platformOptions = ['Web', 'Android', 'iOS'];

const Step2AudienceSegment = () => {
  const { campaign, updateCampaign, nextStep, prevStep } = useContext(CampaignContext);
  const [showCustomFilters, setShowCustomFilters] = useState(
    campaign.step2.audienceType === 'Custom Segment'
  );

  const handleAudienceChange = (value) => {
    updateCampaign('step2', { audienceType: value });
    setShowCustomFilters(value === 'Custom Segment');
  };

  const handlePlatformChange = (selectedPlatforms) => {
    updateCampaign('step2', {
      customFilters: {
        ...campaign.step2.customFilters,
        platforms: selectedPlatforms,
      },
    });
  };

  const handleCountryChange = (e) => {
    updateCampaign('step2', {
      customFilters: {
        ...campaign.step2.customFilters,
        country: e.target.value,
      },
    });
  };

  const handleDateRangeChange = (range) => {
    updateCampaign('step2', {
      customFilters: {
        ...campaign.step2.customFilters,
        signupDateRange: range,
      },
    });
  };

  return (
    <div className="step-container">
      <h2>Audience Segment</h2>
      <div className="form-group">
        <SelectDropdown
          label="Select Audience Type"
          options={audienceOptions}
          selected={campaign.step2.audienceType}
          onSelect={handleAudienceChange}
        />
      </div>

      {showCustomFilters && (
        <div className="custom-filters">
          <h3>Custom Filters</h3>
          <div className="form-group">
            <label>Platform</label>
            <div className="checkbox-group">
              {platformOptions.map((platform) => (
                <label key={platform}>
                  <input
                    type="checkbox"
                    checked={campaign.step2.customFilters.platforms.includes(platform)}
                    onChange={() => {
                      const newPlatforms = campaign.step2.customFilters.platforms.includes(platform)
                        ? campaign.step2.customFilters.platforms.filter((p) => p !== platform)
                        : [...campaign.step2.customFilters.platforms, platform];
                      handlePlatformChange(newPlatforms);
                    }}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <Input
              label="Country"
              value={campaign.step2.customFilters.country}
              onChange={handleCountryChange}
            />
          </div>

          <div className="form-group">
            <label>Signup Date Range</label>
            <DateRangePicker
              ranges={[campaign.step2.customFilters.signupDateRange]}
              onChange={(item) => handleDateRangeChange(item.selection)}
            />
          </div>
        </div>
      )}

      <div className="button-group">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

export default Step2AudienceSegment;
