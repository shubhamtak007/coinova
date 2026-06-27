import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Dispatch, memo, SetStateAction } from "react";
import { Spinner } from "@/components/ui/spinner";
import { NewsArticle } from "@/interfaces/news.interface";
import useNews from "@/hooks/useNews";

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default memo(function NewsDialog(bindings: Bindings) {
    const { showDialog, setShowDialog } = bindings;
    const { articles, fetchingLatestNews } = useNews({ showDialog });

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
                    {(fetchingLatestNews === true) ?
                        <Spinner className="size-15 m-[10px_auto]" /> :
                        (articles && articles.length > 0) ? <div className="article-list">
                            {articles.map((article: NewsArticle, index) => {
                                return (
                                    <article
                                        key={article.publishedAt}
                                        className="article"
                                        onClick={() => {
                                            window.open(article.url, '_blank')
                                        }}
                                    >
                                        <div>
                                            <div className="text-[12px] font-bold">
                                                {article.source.name}
                                            </div>

                                            <div className="text-[13px] width-[100%]">
                                                {article.description}
                                            </div>
                                        </div>

                                        <div className="article-image">
                                            <img
                                                src={article.urlToImage}
                                            />
                                        </div>
                                    </article>
                                )
                            })}
                        </div> : <div className="no-value-text">No articles</div>
                    }
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
})