import { useState, useRef, memo } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import type { CaptchaData } from "@/interfaces/captcha.interface";

type Bindings = {
    sendCaptchaDataToParent: (captchaData: CaptchaData) => void;
}

export default function Captcha(bindings: Bindings) {
    const { sendCaptchaDataToParent } = bindings;
    const captchaRef = useRef<HCaptcha | null>(null);

    function verifyCaptcha(token: string) {
        const captchaData = { ref: captchaRef, token: token }
        sendCaptchaDataToParent(captchaData);
    };

    return (
        <HCaptcha
            ref={captchaRef}
            id="invisible-hcaptcha"
            size="invisible"
            sitekey={`25c209b8-9de8-464c-83fe-317e4a241aca`}
            onExpire={() => { captchaRef.current?.resetCaptcha(); }}
            onLoad={() => { captchaRef.current?.execute(); }}
            onVerify={(token) => { verifyCaptcha(token) }}
            onError={() => { captchaRef.current?.resetCaptcha(); }}
        />
    )
}
