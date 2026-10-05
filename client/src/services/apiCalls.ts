// import type { Alert } from "../types/alert";
// import type { Response } from "../types/response";

// const API = "http://localhost:3001/api/alerts";

// export const getAlerts = async () => {
//     const res = await fetch(API);
//     const resData = (await res.json()) as Response<Alert[]>;
//     if (!resData.success) throw new Error(resData.message);
//     return resData.data;
// };

// export const getAlert = async (id: string) => {
//     const res = await fetch(`${API}/${id}`);
//     const resData = (await res.json()) as Response<Alert[]>;
//     if (!resData.success) throw new Error(resData.message);
//     return resData.data;
// };
