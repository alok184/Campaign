import { useContext, useState } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import './Step5Review.css'
const Step5Review = () => {
  const { campaign, prevStep } = useContext(CampaignContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (step) => {
    // Implementation to navigate back to a specific step
    // This would require additional context or state management
    console.log(`Edit step ${step}`);
  };

  const handleSubmit = () => {
    // In a real app, this would send data to an API
    console.log('Submitting campaign:', campaign);
    setIsSubmitted(true);

    // Simulate API call
    setTimeout(() => {
      // After submission, navigate to campaigns list page
      navigate('/campaigns');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="step-container">
        <h2>Campaign Submitted Successfully!</h2>
        <p>Your campaign has been scheduled and will be sent to your audience.</p>
      </div>
    );
  }

  return (
    <div className="step-container">
      <h2>Review & Confirm</h2>

      <div className="review-section">
        <h3>Campaign Information</h3>
        <p><strong>Name:</strong> {campaign?.step1?.campaignName || 'N/A'}</p>
        <p><strong>Description:</strong> {campaign?.step1?.campaignDescription || 'None'}</p>
        <Button variant="text" onClick={() => handleEdit(1)}>
          Edit
        </Button>
      </div>

      <div className="review-section">
        <h3>Audience Segment</h3>
        <p><strong>Audience Type:</strong> {campaign?.step2?.audienceType || 'N/A'}</p>
        {campaign?.step2?.audienceType === 'Custom Segment' && (
          <>
            <p>
              <strong>Platforms:</strong>{' '}
              {campaign?.step2?.customFilters?.platforms?.length
                ? campaign.step2.customFilters.platforms.join(', ')
                : 'None'}
            </p>
            <p><strong>Country:</strong> {campaign?.step2?.customFilters?.country || 'Any'}</p>
            <p>
              <strong>Signup Date Range:</strong>{' '}
              {campaign?.step2?.customFilters?.signupDateRange?.start && campaign.step2.customFilters.signupDateRange.end
                ? `${new Date(campaign.step2.customFilters.signupDateRange.start).toLocaleDateString()} to ${new Date(campaign.step2.customFilters.signupDateRange.end).toLocaleDateString()}`
                : 'None'}
            </p>
          </>
        )}
        <Button variant="text" onClick={() => handleEdit(2)}>
          Edit
        </Button>
      </div>

      <div className="review-section">
        <h3>Message</h3>
        <p><strong>Channel:</strong> {campaign?.step3?.channel || 'N/A'}</p>
        <div className="message-preview">
          {campaign?.step3?.channel === 'Email' ? (
            <div dangerouslySetInnerHTML={{ __html: campaign.step3.message || '' }} />
          ) : (
            <p>{campaign?.step3?.message || ''}</p>
          )}
        </div>
        <Button variant="text" onClick={() => handleEdit(3)}>
          Edit
        </Button>
      </div>

      <div className="review-section">
        <h3>Schedule</h3>
        <p><strong>Schedule Type:</strong> {campaign?.step4?.scheduleType || 'N/A'}</p>
        {campaign?.step4?.scheduleType === 'Schedule Later' && campaign?.step4?.scheduledTime && (
          <p><strong>Scheduled Time:</strong> {new Date(campaign.step4.scheduledTime).toLocaleString()}</p>
        )}
        <Button variant="text" onClick={() => handleEdit(4)}>
          Edit
        </Button>
      </div>

      <div className="button-group">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Submit Campaign</Button>
      </div>
    </div>
  );
};

export default Step5Review;
