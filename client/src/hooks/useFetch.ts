import { useState } from "react";
import type { Response } from "../types/response";
import type { FormType } from "../types/form";
import type { LoginForm } from "../pages/LoginPage";

const BASE_API = "http://localhost:3001/api/";

const useFetch = <T>(restUrl: string = "", method = "GET") => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const executed = async (body?: FormType | LoginForm, token?: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(BASE_API + restUrl, {
                method,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const resData = (await res.json()) as Response<T>;
            if (!resData.success) return setError(resData.message);
            return resData.data as T;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { error, isLoading, executed };
};

export default useFetch;
