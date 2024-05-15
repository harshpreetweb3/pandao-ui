import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalStore from "@/store/modal";

const AgreementModal = () => {
  const { open, setOpen } = useModalStore();
  return (
    <div>
      <Dialog open={open} setOpen={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold" >User Agreement</DialogTitle>
            <DialogDescription className="max-h-[400px] h-full  overflow-y-auto p-2 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              molestiae! Aliquid non impedit, maxime voluptas cupiditate quos
              enim obcaecati velit. Dolorum itaque doloribus numquam, laudantium
              laborum provident molestiae quo praesentium voluptates quas iure
              consequatur repudiandae totam atque quisquam eum. Quam placeat
              quidem ex maxime veritatis exercitationem debitis reiciendis
              libero eum non. Omnis, dignissimos adipisci perspiciatis inventore
              nam doloremque sunt natus minus voluptatem officia, iste at eum
              molestiae tempore! Consectetur qui quidem dolorum accusantium
              debitis nesciunt quibusdam beatae voluptatibus officia possimus
              vero rerum ducimus cupiditate quasi, consequatur laboriosam at
              voluptates eius. Est cum dolore adipisci sit qui. Dolores ipsa
              rerum consectetur.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              molestiae! Aliquid non impedit, maxime voluptas cupiditate quos
              enim obcaecati velit. Dolorum itaque doloribus numquam, laudantium
              laborum provident molestiae quo praesentium voluptates quas iure
              consequatur repudiandae totam atque quisquam eum. Quam placeat
              quidem ex maxime veritatis exercitationem debitis reiciendis
              libero eum non. Omnis, dignissimos adipisci perspiciatis inventore
              nam doloremque sunt natus minus voluptatem officia, iste at eum
              molestiae tempore! Consectetur qui quidem dolorum accusantium
              debitis nesciunt quibusdam beatae voluptatibus officia possimus
              vero rerum ducimus cupiditate quasi, consequatur laboriosam at
              voluptates eius. Est cum dolore adipisci sit qui. Dolores ipsa
            </DialogDescription>
            <Button onClick={()=>{
                setOpen(false)
            }} > 
                Agree
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgreementModal;
