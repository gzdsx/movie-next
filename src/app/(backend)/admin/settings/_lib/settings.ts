import {apiGet, apiPost} from "@/lib/backendApi";

export async function getSettings() {
    const response = await apiGet('/settings');

    return {...response.data};
}

export async function updateSettings(data: any) {
    await apiPost('/settings', data);
}
