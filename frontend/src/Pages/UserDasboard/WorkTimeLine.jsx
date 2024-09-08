import { Card } from '@/components/ui/card';
import PropTypes from 'prop-types';

const TimelineItem = ({ item }) => {
  return (
    <Card  className="flex items-start mb-8 p-2 rounded-none border-l-0">
      <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4"></div>
      <div className="flex flex-col flex-grow">
        <span className="text-sm font-semibold text-gray-500">
          {new Date(item.from_date).toLocaleDateString()} - {item.to_date ? new Date(item.to_date).toLocaleDateString() : 'Present'}
        </span>
        <h3 className="text-lg font-bold text-gray-800">{item.company}</h3>
        <p className="text-md text-blue-600 font-semibold">{item.designation}</p>
        <p className="text-gray-700">{item.description}</p>
      </div>
    </Card>
  );
};

TimelineItem.propTypes = {
  item: PropTypes.shape({
    from_date: PropTypes.string.isRequired,
    to_date: PropTypes.string,
    company: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.string.isRequired
  }).isRequired
};

const Timeline = ({ items }) => {
  return (
    <div className="border-l-2 border-blue-500 ">
      {items.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </div>
  );
};

Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      from_date: PropTypes.string.isRequired,
      to_date: PropTypes.string,
      company: PropTypes.string.isRequired,
      designation: PropTypes.string.isRequired,
      description: PropTypes.string,
      id: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Timeline;
