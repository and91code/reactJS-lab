import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export default function Modal({
  children,
  triggeer,
}: {
  children?: React.ReactNode;
  triggeer?: React.ReactNode;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger>{triggeer}</DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="">{children}</div>

          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
