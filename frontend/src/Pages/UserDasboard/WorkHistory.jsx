import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const WorkHistoryItem = ({ history, onChange, onRemove }) => {
    const formatDate = (dateStr) => {
        return dateStr ? new Date(dateStr).toISOString().slice(0, 10) : '';
      };
    
  return (
    <div className="p-4 space-y-2 border rounded-lg shadow-sm">
      <Input
        value={history.company}
        onChange={e => onChange(e.target.value, 'company')}
        placeholder="Company Name"
      />
      <Input
        type="date"
        value={formatDate(history.from_date)}
        onChange={e => onChange(e.target.value, 'from_date')}
      />
      <Input
        type="date"
        value={formatDate(history.to_date)}
        onChange={e => onChange(e.target.value, 'to_date')}
        disabled={history.current}
      />
      <div className='flex items-center gap-2 text-xs my-3 px-2'>
        <span> Currently Working Here</span>
        <Checkbox
        checked={history.current}
        onCheckedChange={e => onChange(e.target.checked, 'current')}
        label="Currently Working"
      />
      </div>
    
      <Input
        value={history.designation}
        onChange={e => onChange(e.target.value, 'designation')}
        placeholder="Designation"
      />
      <Textarea
        value={history.description}
        onChange={e => onChange(e.target.value, 'description')}
        placeholder="Job Description"
      />
      <Button onClick={onRemove} className="bg-red-500 hover:bg-red-600 mt-2">
        <Trash2/>
      </Button>
    </div>
  );
};

WorkHistoryItem.propTypes = {
  history: PropTypes.shape({
    company: PropTypes.string,
    from_date: PropTypes.string,
    to_date: PropTypes.string,
    current: PropTypes.bool,
    designation: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default WorkHistoryItem;
