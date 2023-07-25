/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Article } from "../interfaces/article.interface";
import { FORM_ARTICLE_SCHEMA } from "../constants/articles.const";
import { createArticleFromFields } from "../utils/createArticleFromFields";
import { Button, Input } from "@mantine/core";
import { IconFile, IconHash } from '@tabler/icons-react';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

interface FormArticleProps {
    article?: Article;
    onSubmit: (article: Article) => Promise<void>;
}

export const FormArticle = ({ article, onSubmit }: FormArticleProps) => {
    const { handleSubmit, register, setValue,  formState: { errors } } = useForm<Article>({
        resolver: zodResolver(FORM_ARTICLE_SCHEMA),
        defaultValues: article,
    });
    
    const [markdown, setMarkdown] = useState<string | undefined>(article?.content);
    useEffect(() => {
        if (article) {
            setValue('title', article.title.split('-').join(" "));
            setValue('collectionName', article.collectionName);
            setMarkdown(article.markdown);
        }
    }, [article, setValue]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: article?.markdown ? article?.markdown : markdown,
    });
    
    useEffect(() => {
        if (editor) {
            register('markdown');
            editor.on('update', () => {
                setValue('markdown', editor.getHTML());
                setMarkdown(editor.getHTML());
            });
            
        }
    }, [editor, register, setValue]);
    
    const localOnSubmit = async (formFields: any) => {
        const articleToSubmit = createArticleFromFields(formFields);
        // @ts-ignore
        articleToSubmit.markdown = markdown;
        articleToSubmit._id = article?._id;
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

                    <Input
                        icon={<IconFile />}
                        size="lg"
                        placeholder="Collection"
                        {...register('collectionName')}
                    />

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
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
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

                    {errors.markdown && (
                        <div className='alert alert-danger'>
                            {errors.markdown.message}
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
