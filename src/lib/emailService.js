import emailjs from '@emailjs/browser';

// EmailJS Configuration
// NOTE: For production, move these to environment variables
const EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

/**
 * Send password reset email
 * @param {string} email - User email
 * @param {string} userName - User name
 * @param {string} resetToken - Reset token
 * @returns {Promise<void>}
 */
export const sendPasswordResetEmail = async (email, userName, resetToken) => {
    try {
        // Generate reset link
        const resetLink = `${window.location.origin}/reset-password/${resetToken}`;

        // Email template parameters
        const templateParams = {
            to_email: email,
            user_name: userName,
            reset_link: resetLink,
            expiry_time: '30 minutes',
        };

        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        console.log('Password reset email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        throw new Error('Failed to send reset email. Please try again later.');
    }
};

/**
 * Check if EmailJS is configured
 * @returns {boolean}
 */
export const isEmailConfigured = () => {
    return (
        EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
        EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
        EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY'
    );
};

/**
 * Send test email (for development/testing)
 * @param {string} email - Test email
 * @returns {Promise<void>}
 */
export const sendTestEmail = async (email) => {
    try {
        const templateParams = {
            to_email: email,
            user_name: 'Test User',
            reset_link: `${window.location.origin}/reset-password/test-token-123`,
            expiry_time: '30 minutes',
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        console.log('Test email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to send test email:', error);
        throw error;
    }
};
