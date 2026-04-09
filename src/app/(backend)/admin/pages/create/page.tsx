'use client';

import {PageForm} from "../PageForm";
import {App, Card} from "antd";
import {useState} from "react";
import {useTranslations} from "@/contexts/LocaleContext";
import {apiPost} from "@/lib/backendApi";
import {useRouter} from "next/navigation";

export default function Page() {
    const [submitting, setSubmitting] = useState(false);
    const {message} = App.useApp();
    const {t} = useTranslations('pages');
    const router = useRouter();

    const handleSubmit = async (values: {
        title: string;
        slug: string;
        keywords: string;
        description: string;
        status: string;
        sort_num: number;
        thumbnail: string;
        content: string;
    }) => {
        //console.log(values);
        const pageData = {
            title: values.title,
            slug: values.slug,
            keywords: values.keywords,
            description: values.description,
            status: values.status,
            sort_num: values.sort_num,
            thumbnail: values.thumbnail,
            content: values.content,
        };
        try {
            setSubmitting(true);
            const response = await apiPost(`/pages`, pageData);
            message.success(t('updateSuccess'));
            router.replace(`/admin/pages/${response.data.id}/edit`);
        } catch (error: any) {
            message.error(error?.message || '操作失败');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card title={t('addPage')} variant="borderless">
            <PageForm
                onSubmit={handleSubmit}
                submitting={submitting}
                initialValues={{
                    status: 'draft',
                    sort_num: 0,
                }}
            />
        </Card>
    );
}
