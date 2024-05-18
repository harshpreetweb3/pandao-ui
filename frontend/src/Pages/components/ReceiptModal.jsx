import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalStore from "@/store/modal";

const ReceiptModal = ({children}) => {
  const { successOpen,setSuccessOpen } = useModalStore();
  return (
    <div>
      <Dialog open={successOpen} setOpen={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold" >Receipt</DialogTitle>
            <DialogDescription className="max-h-[400px] h-full w-full  overflow-y-auto p-2 ">
             {children}
            </DialogDescription>
            <Button onClick={()=>{
                setSuccessOpen(false)
            }} > 
                OK
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
ReceiptModal.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export default ReceiptModal;
