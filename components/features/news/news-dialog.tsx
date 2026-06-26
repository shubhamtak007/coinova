import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Dispatch, memo, SetStateAction } from "react";
import useNews from "@/hooks/useNews";

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default memo(function NewsDialog(bindings: Bindings) {
    const { showDialog, setShowDialog } = bindings;
    const { articles, fetchingLatestNews } = useNews();

    return (
        <Dialog
            open={showDialog}
            onOpenChange={setShowDialog}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        News
                    </DialogTitle>

                    <DialogDescription className="text-[11px] m-[4px_0px] sr-only">
                        news dialog
                    </DialogDescription>
                </DialogHeader>

                <DialogBody>

                </DialogBody>
            </DialogContent>
        </Dialog>
    )
})