'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog';
import type { CoingeckoCrypto } from '@/interfaces/crypto-currency';

type Bindings = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void,
    coin: CoingeckoCrypto | null
}

function CoinDetailsDialog({ ...props }: Bindings) {
    const { showDialog, setShowDialog, coin } = props;

    return (
        <div>
            <Dialog
                open={showDialog}
                onOpenChange={setShowDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {coin?.name}
                        </DialogTitle>
                    </DialogHeader>

                    <DialogBody>

                    </DialogBody>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CoinDetailsDialog;