import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Circle, CheckCircle } from 'lucide-react'; // Ensure you have these icons imported

const StepIndicator = ({ currentStep, steps }) => (
  <div className="relative w-full z-50 bg-white">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center">
            <motion.div
              className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                index <= currentStep
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-600'
              }`}
              animate={{ scale: 1.02 }}
            >
              {index < currentStep ? (
                <CheckCircle size={17} />
              ) : (
                <Circle size={17} fill="currentColor" />
              )}
            </motion.div>
          </div>
          {index < steps.length - 1 && (
            <div className="relative flex-grow">
              <div className="absolute -top-1 h-1.5 w-full bg-gray-100 dark:bg-gray-800" />
              <motion.div
                className="absolute -top-1 h-1.5 w-full bg-purple-500"
                initial={{ width: '0%' }}
                animate={{
                  width: index < currentStep ? '100%' : '0%',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

StepIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired
  })).isRequired
};

export default StepIndicator;
