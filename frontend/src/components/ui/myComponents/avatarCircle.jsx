import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';

function AvatarCircles({ numPeople,src1 }) {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse")}>
      <img
        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
        src={src1}
        alt=""
      />
      <img
        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
        src="https://avatars.githubusercontent.com/u/29210732"
        alt=""
      />
      <img
        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
        src="https://avatars.githubusercontent.com/u/20110627"
        alt=""
      />
      <a className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black">
        +{numPeople}
      </a>
    </div>
  );
}

AvatarCircles.propTypes = {
  numPeople: PropTypes.number.isRequired,
  src1:PropTypes
};

export default AvatarCircles;
