import PropTypes from 'prop-types';
import { Card } from "@/components/ui/card";

export const StepsCard = ({ step, title, icon: Icon }) => {
  return (
    <Card className="bg-white w-full text-black mt-10 p-5 flex flex-col gap-3 rounded-xl shadow-sm h-64">
      <div className="bg-purple-50 rounded-md text-center flex items-center justify-center h-36">
        <Icon className="h-16 w-16 text-purple-400" />
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
