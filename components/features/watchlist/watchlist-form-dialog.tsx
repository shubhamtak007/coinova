import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import useWatchlistForm from "@/hooks/useWatchlistForm";
import { DialogProps } from "@/interfaces/global.interface";
import { Textarea } from "@/components/ui/textarea";

type Bindings = {
    onDialogClose(): void,
    dialogLevel?: number
} & DialogProps;

export default function WatchlistFormDialog(bindings: Bindings) {
    const { showDialog, setShowDialog, onDialogClose, dialogLevel } = bindings;
    const { watchlistForm, submittingData } = useWatchlistForm({ setShowDialog });

    return (
        <Dialog
            open={showDialog}
            onOpenChange={(showDialog) => {
                setShowDialog(showDialog);
            }}
        >
            <DialogContent
                onCloseAutoFocus={onDialogClose}
                dialogLevel={dialogLevel}
            >
                <DialogHeader>
                    <DialogTitle>
                        Create Watchlist
                    </DialogTitle>

                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>

                <DialogBody>
                    <form
                        className="watchlist-form"
                        key={'watchlist-form'}
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            watchlistForm.handleSubmit();
                        }}
                        onChange={(event) => {

                        }}
                        onBlur={(event) => {

                        }}
                    >
                        <div className="form-group">
                            <watchlistForm.Field
                                name="name"
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>
                                                Name<span className="required">*</span>
                                            </label>

                                            <InputGroup>
                                                <InputGroupInput
                                                    id={field.name}
                                                    required={true}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    placeholder={'Watchlist Name'}
                                                    autoFocus={true}
                                                    disabled={submittingData}
                                                />
                                            </InputGroup>
                                        </>
                                    )
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <watchlistForm.Field
                                name="description"
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>
                                                Description
                                            </label>

                                            <Textarea
                                                id={field.name}
                                                required={false}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder={'Description'}
                                                disabled={submittingData}
                                            />
                                        </>
                                    )
                                }}
                            />
                        </div>

                        <div className="text-center">
                            <watchlistForm.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                            >
                                {([canSubmit, isSubmitting]) => (
                                    <>
                                        <Button
                                            type="submit"
                                            disabled={!watchlistForm.state.isValid || !canSubmit || isSubmitting || submittingData}
                                        >
                                            {submittingData && <Spinner className="size-4" />}
                                            Create
                                        </Button>
                                    </>
                                )}
                            </watchlistForm.Subscribe>
                        </div>
                    </form>
                </DialogBody>
            </DialogContent>
        </Dialog >
    )
}