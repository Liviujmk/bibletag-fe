import { ContainerLayout } from "../common/layouts/page/container.layout";
import { FormArticle } from "../features/articles/components/form-article";
import { Article } from "../features/articles/interfaces/article.interface";
import { useUpdateArticleMutation, useGetArticleQuery } from "../features/articles/api/articles.api";
import { useParams, useNavigate } from "react-router-dom";
import { FailedPage } from "../common/components/failed";
import { CardsSkeleton } from "../common/layouts/skeletons/cards.skeleton";

export const EditArticlePage = () => {
    const { id } = useParams<{id: any}>();
    
    const { data: article, isError } = useGetArticleQuery(id);
    const [updateArticle] = useUpdateArticleMutation();
    const navigate = useNavigate()
    
    const onSubmit = async (fieldValues: Article) => {
        console.log(article?._id)
        await updateArticle({
            id: article?._id,
            ...fieldValues,
        }).then((res) => {
            console.log(res);
            navigate(`/articles/${article?._id}`)
        });
    };
    
    if (isError) return <FailedPage />;
    if (!article) return <CardsSkeleton pageTitle="Edit Article" />;

    return (
        <div>
            <ContainerLayout>
                <h1>Edit article: {article?.title.split('-').join(" ")}</h1>
                <FormArticle 
                    onSubmit={onSubmit}
                    article={article}
                />
            </ContainerLayout>
        </div>
    );
};