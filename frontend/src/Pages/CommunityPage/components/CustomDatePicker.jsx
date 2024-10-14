import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

const CustomDatePicker = ({value,onClick}) => {
    return ( <div className="flex items-center bg-white  gap-2">
<Input
type="text"
value={value}
onClick={onClick}
readOnly
/>
<div>
    <Calendar/>
</div>
    </div> );
}
 
export default CustomDatePicker;