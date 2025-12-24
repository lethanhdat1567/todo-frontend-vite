const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getTasks = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`);
    const json = await res.json();
    return json.data;
};

export const createTask = async (title) => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    return res.json();
};

export const updateTask = async (id, payload) => {
    const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return res.json();
};

export const deleteTask = async (id) => {
    await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
    });
};

export const byPassCors = async () => {
    const res = await fetch(
        `${BASE_URL}/bypass-cors?url=https://api-gateway.fullstack.edu.vn/api/analytics`
    );

    const json = await res.json();
    return json.data;
};
