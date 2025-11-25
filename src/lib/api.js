const API_BASE_URL = 'http://localhost:3001';

// Items API
export const itemsAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/items`);
        if (!response.ok) throw new Error('Failed to fetch items');
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`);
        if (!response.ok) throw new Error('Failed to fetch item');
        return response.json();
    },

    create: async (item) => {
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        if (!response.ok) throw new Error('Failed to create item');
        return response.json();
    },

    update: async (id, item) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        if (!response.ok) throw new Error('Failed to update item');
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete item');
    },

    search: async (query, category) => {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (category) params.append('category', category);

        const response = await fetch(`${API_BASE_URL}/items?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to search items');
        return response.json();
    },
};

// Contacts API
export const contactsAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        if (!response.ok) throw new Error('Failed to fetch contacts');
        return response.json();
    },

    create: async (contact) => {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact),
        });
        if (!response.ok) throw new Error('Failed to create contact');
        return response.json();
    },

    update: async (id, contact) => {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact),
        });
        if (!response.ok) throw new Error('Failed to update contact');
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete contact');
    },
};

// Users API
export const usersAPI = {
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/users?email=${email}&password=${password}`);
        if (!response.ok) throw new Error('Failed to login');
        const users = await response.json();
        if (users.length === 0) {
            throw new Error('Invalid email or password');
        }
        return users[0]; // Return the first matching user
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...userData, role: 'user' }),
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json();
    },

    checkEmail: async (email) => {
        const response = await fetch(`${API_BASE_URL}/users?email=${email}`);
        if (!response.ok) throw new Error('Failed to check email');
        const users = await response.json();
        return users.length > 0; // Returns true if email exists
    },

    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    updateStatus: async (userId, status) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Failed to update user status');
        return response.json();
    },

    update: async (userId, userData) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Failed to update user');
        return response.json();
    },

    delete: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
    },
};
