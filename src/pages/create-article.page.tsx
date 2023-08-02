import { ContainerLayout } from "../common/layouts/page/container.layout";
import { FormArticle } from "../features/articles/components/form-article";
import { Article } from "../features/articles/interfaces/article.interface";
import { useCreateArticleMutation } from "../features/articles/api/articles.api";
import { useNavigate } from "react-router-dom";
import { Box } from "@mantine/core";

export const CreateArticlePage = () => {
    const navigate = useNavigate()
    const [createArticle, { isSuccess }] = useCreateArticleMutation();
    
    const onSubmit = async (fieldValues: Article) => {
        await createArticle(fieldValues).then((res: any)=>{
            navigate(`/articles/${res.data._id}`);
        })
    };

    return (
        <Box mt={50}>
            <h1>Create Article</h1>
            <FormArticle onSubmit={onSubmit} />
        </Box>
    );
};