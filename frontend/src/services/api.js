const API_BASE_URL = "http://localhost:8080/api";

export const apiRequest = async (endpoint, options = {}) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",

                ...(token && {
                    Authorization: `Bearer ${token}`
                }),

                ...(options.headers || {})
            }
        }
    );

    if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
            errorText || `Request failed: ${response.status}`
        );
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};