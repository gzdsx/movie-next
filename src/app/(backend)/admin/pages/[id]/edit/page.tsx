'use client';

import {useState, useEffect} from 'react';
import {Card, App} from 'antd';
import {useParams} from 'next/navigation';
import {apiGet, apiPut} from '@/lib/backendApi';
import {useTranslations} from '@/contexts/LocaleContext';
import {PageForm} from "../../PageForm";

export default function PageEditPage() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initValues, setInitValues] = useState({});

    const {message} = App.useApp();
    const {t} = useTranslations('pages');

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await apiGet(`/pages/${params.id}`);
                setInitValues({...response.data});
            } catch (error) {
                message.error(t('fetchError'));
            } finally {
                setLoading(false);
            }
        })();
    }, [params.id]);

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
            await apiPut(`/pages/${params.id}`, pageData);
            message.success(t('updateSuccess'));
        } catch (error: any) {
            message.error(error?.message || '操作失败');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card title={t('editPage')} variant="borderless" loading={loading}>
            <PageForm
                initialValues={initValues}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </Card>
    );
}
