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

    // Profile management
    getProfile: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        return response.json();
    },

    updateProfile: async (userId, profileData) => {
        // Check if email is being changed and if it's already used by another user
        if (profileData.email) {
            const emailCheckResponse = await fetch(`${API_BASE_URL}/users?email=${profileData.email}`);
            if (!emailCheckResponse.ok) throw new Error('Failed to check email');
            const existingUsers = await emailCheckResponse.json();

            // Check if email is used by another user (not the current user)
            const emailTaken = existingUsers.some(user => user.id !== userId);
            if (emailTaken) {
                throw new Error('Email is already in use by another account');
            }
        }

        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profileData),
        });
        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
    },

    changePassword: async (userId, currentPassword, newPassword) => {
        // Fetch user to verify current password
        const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user');
        const user = await userResponse.json();

        // Verify current password
        if (user.password !== currentPassword) {
            throw new Error('Current password is incorrect');
        }

        // Update password
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: newPassword }),
        });
        if (!response.ok) throw new Error('Failed to change password');
        return response.json();
    },
};

// Password Reset API
export const passwordResetAPI = {
    // Request password reset - generates token and saves to database
    requestReset: async (email) => {
        try {
            // Check if user exists
            const usersResponse = await fetch(`${API_BASE_URL}/users?email=${email}`);
            if (!usersResponse.ok) throw new Error('Failed to check user');
            const users = await usersResponse.json();

            if (users.length === 0) {
                // For security, return success even if email doesn't exist
                return { success: true, message: 'If an account exists with this email, you will receive a reset link.' };
            }

            const user = users[0];

            // Generate reset token
            const token = crypto.randomUUID();
            const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes

            // Create password reset record
            const resetRecord = {
                id: crypto.randomUUID(),
                userId: user.id,
                email: user.email,
                token: token,
                expiresAt: expiresAt,
                used: false,
                createdAt: new Date().toISOString(),
            };

            // Save to database
            const response = await fetch(`${API_BASE_URL}/passwordResets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resetRecord),
            });

            if (!response.ok) throw new Error('Failed to create reset token');

            return {
                success: true,
                token: token,
                userName: user.name,
                email: user.email,
                message: 'If an account exists with this email, you will receive a reset link.'
            };
        } catch (error) {
            console.error('Password reset request error:', error);
            throw error;
        }
    },

    // Validate reset token
    validateToken: async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/passwordResets?token=${token}`);
            if (!response.ok) throw new Error('Failed to validate token');

            const resets = await response.json();

            if (resets.length === 0) {
                return { valid: false, message: 'Invalid reset token' };
            }

            const reset = resets[0];

            // Check if already used
            if (reset.used) {
                return { valid: false, message: 'This reset link has already been used' };
            }

            // Check if expired
            if (new Date(reset.expiresAt) < new Date()) {
                return { valid: false, message: 'This reset link has expired' };
            }

            return { valid: true, reset: reset };
        } catch (error) {
            console.error('Token validation error:', error);
            throw error;
        }
    },

    // Reset password
    resetPassword: async (token, newPassword) => {
        try {
            // Validate token first
            const validation = await passwordResetAPI.validateToken(token);

            if (!validation.valid) {
                throw new Error(validation.message);
            }

            const reset = validation.reset;

            // Update user password
            const userResponse = await fetch(`${API_BASE_URL}/users/${reset.userId}`);
            if (!userResponse.ok) throw new Error('Failed to fetch user');
            const user = await userResponse.json();

            const updatedUser = {
                ...user,
                password: newPassword, // In production, this should be hashed
            };

            const updateResponse = await fetch(`${API_BASE_URL}/users/${reset.userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (!updateResponse.ok) throw new Error('Failed to update password');

            // Mark token as used
            const updatedReset = {
                ...reset,
                used: true,
                usedAt: new Date().toISOString(),
            };

            const markUsedResponse = await fetch(`${API_BASE_URL}/passwordResets/${reset.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedReset),
            });

            if (!markUsedResponse.ok) throw new Error('Failed to mark token as used');

            return { success: true, message: 'Password reset successful' };
        } catch (error) {
            console.error('Password reset error:', error);
            throw error;
        }
    },

    // Cleanup expired tokens (optional, can be called periodically)
    cleanupExpiredTokens: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/passwordResets`);
            if (!response.ok) throw new Error('Failed to fetch reset tokens');

            const resets = await response.json();
            const now = new Date();

            // Delete expired tokens
            const deletePromises = resets
                .filter(reset => new Date(reset.expiresAt) < now)
                .map(reset =>
                    fetch(`${API_BASE_URL}/passwordResets/${reset.id}`, {
                        method: 'DELETE',
                    })
                );

            await Promise.all(deletePromises);
            return { success: true, deleted: deletePromises.length };
        } catch (error) {
            console.error('Cleanup error:', error);
            throw error;
        }
    },
};
