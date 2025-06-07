// src/components/Step4Schedule.jsx
import { useContext, useState } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import Button from './common/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Step4Schedule = () => {
  const { campaign, updateCampaign, nextStep, prevStep } = useContext(CampaignContext);
  const [errors, setErrors] = useState({});

  const handleScheduleTypeChange = (type) => {
    updateCampaign('step4', { scheduleType: type });
  };

  const handleDateChange = (date) => {
    updateCampaign('step4', { scheduledTime: date });
  };

  const validate = () => {
    const newErrors = {};
    if (campaign.step4.scheduleType === 'Schedule Later' && !campaign.step4.scheduledTime) {
      newErrors.scheduledTime = 'Please select a date and time';
    } else if (
      campaign.step4.scheduleType === 'Schedule Later' &&
      campaign.step4.scheduledTime < new Date()
    ) {
      newErrors.scheduledTime = 'Scheduled time cannot be in the past';
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
      <h2>Schedule Campaign</h2>
      
      <div className="form-group">
        <div className="radio-group">
          <label>
            <input
              type="radio"
              checked={campaign.step4.scheduleType === 'Send Now'}
              onChange={() => handleScheduleTypeChange('Send Now')}
            />
            Send Now
          </label>
          <label>
            <input
              type="radio"
              checked={campaign.step4.scheduleType === 'Schedule Later'}
              onChange={() => handleScheduleTypeChange('Schedule Later')}
            />
            Schedule Later
          </label>
        </div>

        {campaign.step4.scheduleType === 'Schedule Later' && (
          <div className="form-group">
            <label>Select Date & Time</label>
            <DatePicker
              selected={campaign.step4.scheduledTime}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              placeholderText="Select date and time"
            />
            {errors.scheduledTime && (
              <span className="error">{errors.scheduledTime}</span>
            )}
          </div>
        )}
      </div>

      <div className="button-group">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={campaign.step4.scheduleType === 'Schedule Later' && !campaign.step4.scheduledTime}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step4Schedule;