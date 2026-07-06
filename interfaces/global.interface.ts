import { Dispatch, SetStateAction } from "react";

interface DialogProps {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

export type { DialogProps };