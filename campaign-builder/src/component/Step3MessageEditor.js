// src/components/Step3MessageEditor.jsx
import { useContext, useState } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import Button from './common/Button';
import ReactQuill from 'react-quill'; // ✅ Directly import
import 'react-quill/dist/quill.snow.css'; // ✅ Quill's default theme
import './Step3MessageEditor.css'
const Step3MessageEditor = () => {
  const { campaign, updateCampaign, nextStep, prevStep } = useContext(CampaignContext);
  const [mode, setMode] = useState('edit');
  const [characterCount, setCharacterCount] = useState(campaign.step3.message?.length || 0);

  const handleChannelChange = (channel) => {
    updateCampaign('step3', { channel });
  };

  const handleMessageChange = (content) => {
    updateCampaign('step3', { message: content });
    if (campaign.step3.channel !== 'Email') {
      setCharacterCount(content.length);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'edit' ? 'preview' : 'edit');
  };

  return (
    <div className="step-container">
      <h2>Message Editor</h2>

      <div className="channel-selector">
        {['Email', 'WhatsApp', 'SMS'].map((channel) => (
          <button
            key={channel}
            className={`channel-tab ${campaign.step3.channel === channel ? 'active' : ''}`}
            onClick={() => handleChannelChange(channel)}
          >
            {channel}
          </button>
        ))}
      </div>

      <div className="form-group">
        <div className="mode-toggle">
          <Button variant="outline" onClick={toggleMode}>
            {mode === 'edit' ? 'Preview' : 'Edit'}
          </Button>
        </div>

        {mode === 'edit' ? (
          campaign.step3.channel === 'Email' ? (
            <ReactQuill
              value={campaign.step3.message}
              onChange={handleMessageChange}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link'],
                  ['clean'],
                ],
              }}
            />
          ) : (
            <textarea
              className="message-input"
              value={campaign.step3.message}
              onChange={(e) => handleMessageChange(e.target.value)}
              maxLength={campaign.step3.channel === 'WhatsApp' ? 1000 : 160}
            />
          )
        ) : (
          <div className="message-preview">
            <h4>Message Preview</h4>
            {campaign.step3.channel === 'Email' ? (
              <div dangerouslySetInnerHTML={{ __html: campaign.step3.message }} />
            ) : (
              <p>{campaign.step3.message}</p>
            )}
          </div>
        )}

        {campaign.step3.channel !== 'Email' && (
          <div className="character-count">
            {characterCount}/{campaign.step3.channel === 'WhatsApp' ? 1000 : 160} characters
          </div>
        )}
      </div>

      <div className="button-group">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

export default Step3MessageEditor;
