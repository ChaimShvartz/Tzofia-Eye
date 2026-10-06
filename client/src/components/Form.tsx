import React, { useState } from "react";
import { type FormType } from "../types/form";
import "./Form.css";
import useUserStore from "../store/useUserStore";
import type { User } from "../types/User";

interface FormProps {
    action?: "create" | "update";
    initialState?: FormType;
    onSubmit: (form: FormType) => void;
}

const Form = ({
    action = "create",
    onSubmit,
    initialState = {
        displayName: "",
        description: "",
        priority: "Low",
        arena: "Center",
        status: "Active",
        lon: 34.78,
        lat: 32.08,
    },
}: FormProps) => {
    const user = useUserStore((state) => state.user) as User;
    const [form, setForm] = useState<FormType>(initialState);

    const onChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? +value : value,
        }));
    };
    const isRequired = action === "create";
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
        >
            <label>
                שם ההתרעה
                <input
                    type="text"
                    name="displayName"
                    value={form.displayName}
                    required={isRequired}
                    onChange={onChange}
                    autoFocus
                />
            </label>
            <label>
                תיאור
                <textarea
                    name="description"
                    value={form.description}
                    required={isRequired}
                    onChange={onChange}
                    cols={25}
                    rows={5}
                ></textarea>
            </label>
            <label>
                דחיפות
                <select
                    name="priority"
                    value={form.priority}
                    required={isRequired}
                    onChange={onChange}
                >
                    <option value="Low">נמוכה</option>
                    <option value="Medium">בינונית</option>
                    <option value="High">גבוהה</option>
                    <option value="Critical">קריטית</option>
                </select>
            </label>
            {user.role !== "arena_user" && (
                <label>
                    זירה
                    <select
                        name="arena"
                        value={form.arena}
                        required={isRequired}
                        onChange={onChange}
                    >
                        <option value="Center">מרכז</option>
                        <option value="North">צפון</option>
                        <option value="South">דרום</option>
                    </select>
                </label>
            )}
            <label>
                סטטוס
                <select
                    name="status"
                    value={form.status}
                    required={isRequired}
                    onChange={onChange}
                >
                    <option value="Active">פעילה</option>
                    <option value="Handled">טופלה</option>
                </select>
            </label>
            <label>
                אורך
                <input
                    type="number"
                    name="lon"
                    value={form.lon}
                    required={isRequired}
                    onChange={onChange}
                />
            </label>
            <label>
                רוחב
                <input
                    type="number"
                    name="lat"
                    value={form.lat}
                    required={isRequired}
                    onChange={onChange}
                />
            </label>
            <button type="submit">שלח</button>
        </form>
    );
};

export default Form;
