import { ContainerLayout } from "../common/layouts/page/container.layout";
import { FormArticle } from "../features/articles/components/form-article";
import { Article } from "../features/articles/interfaces/article.interface";
import { useUpdateArticleMutation, useGetArticleQuery } from "../features/articles/api/articles.api";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";

export const EditArticlePage = () => {
    const { id } = useParams<{id: any}>();
    
    const { data: article, isLoading, isError } = useGetArticleQuery(id);
    const [updateArticle, { isSuccess }] = useUpdateArticleMutation();
    const navigate = useNavigate()
    
    const onSubmit = async (fieldValues: Article) => {
        await updateArticle(fieldValues).then((res) => {
            console.log(res);
            navigate(`/articles/${article?._id}`)
        });
    };
    
    if (isError) return <div>failed to load</div>;
    if (!article) return <div>loading...</div>;

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