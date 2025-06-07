// src/components/ProgressStepper.jsx
// import './ProgressStepper.css';

const ProgressStepper = ({ currentStep }) => {
  const steps = [
    'Campaign Info',
    'Audience Segment',
    'Message Editor',
    'Schedule',
    'Review',
  ];

  return (
    <div className="stepper">
      {steps.map((label, index) => (
        <div
          key={label}
          className={`step ${index + 1 <= currentStep ? 'active' : ''}`}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;