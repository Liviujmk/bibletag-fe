import { Button, Input, MultiSelect } from "@mantine/core";
import { IconHash } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

import { Article } from "../interfaces/article.interface";
import { FORM_ARTICLE_SCHEMA } from "../constants/articles.const";
import { createArticleFromFields } from "../utils/createArticleFromFields";

import { useGetCollectionsQuery } from "../../collections/api/collection-api";
import { transformCollectionToSelectData } from "../../collections/utils/transformCollectionToSelectData";

interface FormArticleProps {
    article?: Article;
    onSubmit: (article: Article) => Promise<void>;
}

export const FormArticle = ({ article, onSubmit }: FormArticleProps) => {
    const {data: collections} = useGetCollectionsQuery();
    
    const [body, setBody] = useState<string>(article?.body || '');
    const [collectionName, setCollectionName] = useState<string[]>(article?.collectionName || []);
    
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<Article>({
        resolver: zodResolver(FORM_ARTICLE_SCHEMA),
        defaultValues: article || {
            title: '',
            collectionName: [],
            body: '',
        },
    });

    
    useEffect(() => {
        if (article) {
            setValue('title', article.title.split('-').join(" "));
            setValue('collectionName', article.collectionName);
            setBody(article.body);
            setCollectionName(article?.collectionName || []);
        }
    }, [article, setValue]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: article?.body ? article?.body : body,
    });

    useEffect(() => {
        if (editor) {
            register('body');
            editor.on('update', () => {
                setValue('body', editor.getHTML());
                setBody(editor.getHTML());
            });

        }
    }, [editor, register, setValue]);

    const localOnSubmit = async (formFields: any) => {
        const articleToSubmit = createArticleFromFields(formFields);
        articleToSubmit.body = body;
        console.log(articleToSubmit)
        await onSubmit(articleToSubmit)
    };

    return (
        <div>
            <form onSubmit={handleSubmit(localOnSubmit)}>
                <div className='form-group'>
                    <Input
                        icon={<IconHash />}
                        placeholder="Title"
                        size="lg"
                        {...register('title')}
                    />
                    {errors.title && (
                        <div className='alert'>
                            {errors.title.message}
                        </div>
                    )}
                </div>
                <div className='form-group'>
                    {
                       collections && (
                           <MultiSelect
                               data={transformCollectionToSelectData(collections)}
                               label="Your favorite frameworks/libraries"
                               placeholder="Pick all that you like"
                               searchable
                               nothingFound="Nothing found"
                               value={collectionName}
                               onChange={(value) => {
                                setCollectionName(value);
                                setValue('collectionName', value);
                               }}
                           />
                        )
                    }
                    {errors.collectionName && (
                        <div className='alert'>
                            {errors.collectionName.message}
                        </div>
                    )}
                </div>
                <div className='form-group'>
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>
                        <RichTextEditor.Content />
                    </RichTextEditor>

                    {errors.body && (
                        <div className='alert alert-danger'>
                            {errors.body.message}
                        </div>
                    )}
                </div>
                <Button type='submit' className='btn btn-primary'>
                    Submit
                </Button>
            </form>
        </div>
    );
};
