"use client";
export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { Suspense, useState } from "react";
import Filter from "./filter";

interface MobileFilterProps {
    sizes: Size[];
    colors: Color[];
};

const MobileFilter = ({
    sizes,
    colors,
} : MobileFilterProps) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    return ( 
        <>
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                Filters
                <Plus size={20}/>
            </Button>
            <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-25">
                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                            <div className="flex items-center justify-end px-4">
                                <IconButton icon={<X size={15} onClick={onClose}/>}/>
                            </div>
                            <div className="p-4">
                                <Suspense fallback={<>Loading...</>}>
                                    <Filter
                                        valueKey="sizeId"
                                        name="Sizes"
                                        data={sizes}
                                    />
                                    <Filter
                                        valueKey="colorId"
                                        name="Colors"
                                        data={colors}
                                    />
                                </Suspense>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
     );
}
 
export default MobileFilter;