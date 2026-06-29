import HCaptcha from "@hcaptcha/react-hcaptcha";
import { RefObject } from "react";

type CaptchaData = {
    ref: RefObject<HCaptcha | null>,
    token: string | null
}

export type { CaptchaData };