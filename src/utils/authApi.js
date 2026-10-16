import { API_URL } from './apiUrl.js';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PRINTABLE_ASCII_PATTERN = /^[\x21-\x7E]+$/;

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const LOCKER_MIN_LENGTH = 8;
const LOCKER_MAX_LENGTH = 64;

export async function parseErrorResponse(response) {
    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
}

export function isValidEmail(value) {
    return typeof value === 'string' && EMAIL_PATTERN.test(value);
}

export function validatePassword(value) {
    if (typeof value !== 'string') {
        return 'Password must be 8–128 characters and contain a number and a special character';
    }
    const hasValidLength = value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH;
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[^\p{L}\p{N}\s]/u.test(value);

    if (!hasValidLength || !hasNumber || !hasSpecialCharacter) {
        return 'Password must be 8–128 characters and contain a number and a special character';
    }
    return null;
}

export function validateLockerPassword(value) {
    if (typeof value !== 'string') {
        return 'Locker password must be 8–64 printable ASCII characters without spaces';
    }
    const hasValidLength = value.length >= LOCKER_MIN_LENGTH && value.length <= LOCKER_MAX_LENGTH;
    const hasOnlyPrintableAscii = PRINTABLE_ASCII_PATTERN.test(value);

    if (!hasValidLength || !hasOnlyPrintableAscii) {
        return 'Locker password must be 8–64 printable ASCII characters without spaces';
    }
    return null;
}

export function buildSessionFromAccount(token, accountData) {
    return {
        token,
        account: {
            id: accountData.id,
            email: accountData.email,
            role: accountData.role,
            status: accountData.status,
            verified: accountData.verified,
            createdAt: accountData.createdAt,
            lastLoginAt: accountData.lastLoginAt,
        },
    };
}

export async function loginAndLoadSession({ email, password }) {
    const loginResponse = await fetch(`${API_URL}/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, rawPassword: password }),
    });

    if (!loginResponse.ok) {
        const errorData = await parseErrorResponse(loginResponse);
        throw new Error(errorData?.message ?? 'Login failed');
    }

    const loginData = await loginResponse.json();

    const accountResponse = await fetch(`${API_URL}/v1/accounts/me`, {
        headers: { Authorization: `Bearer ${loginData.token}` },
    });

    if (!accountResponse.ok) {
        const errorData = await parseErrorResponse(accountResponse);
        throw new Error(errorData?.message ?? 'Failed to fetch account');
    }

    const accountData = await accountResponse.json();
    return buildSessionFromAccount(loginData.token, accountData);
}

export async function registerAccount({ email, password, lockerPassword }) {
    const response = await fetch(`${API_URL}/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            rawPassword: password,
            rawLockerPassword: lockerPassword,
        }),
    });

    if (!response.ok) {
        const errorData = await parseErrorResponse(response);
        throw new Error(errorData?.message ?? 'Registration failed');
    }
}
