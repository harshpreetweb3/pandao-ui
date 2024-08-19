import PropTypes from 'prop-types';
import { Card } from "@/components/ui/card";

export const StepsCard = ({ step, title, icon: Icon }) => {
  return (
    <Card className="bg-white z-10 w-full text-black md:mt-10 mt-2 p-6 flex flex-col gap-3 rounded-xl shadow-sm h-96">
      <div className="bg-purple-50 rounded-md text-center flex items-center justify-center h-72">
        <Icon className="h-28 w-28 text-purple-400" />
      </div>
      <div>
        <div className="font-light">{step}</div>
        <div className="font-semibold">{title}</div>
      </div>
    </Card>
  );
};

// Define PropTypes for validation
StepsCard.propTypes = {
  step: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default StepsCard;
