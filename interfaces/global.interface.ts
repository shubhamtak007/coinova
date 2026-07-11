import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type DialogProps = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

type NavigationBarTab = {
    id: string,
    name: string,
    value: string,
    disabled?: boolean
}

export type { DialogProps, NavigationBarTab };