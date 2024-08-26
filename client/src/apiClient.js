const API_BASE_URL = 'http://localhost:4000/api';

export const authenticateUser = async (openIdUsername, ethAddress) => {
    try {
        const response = await fetch(`${API_BASE_URL}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ openIdUsername, ethAddress }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
};

export const submitStudentForm = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/student-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during form submission:', error);
        throw error;
    }
};

export const fetchStudentData = async (openIdUsername) => {
    const token = localStorage.getItem('studentAuthToken'); // Fetch token before the request
    console.log(token); // Log the token to verify it

    try {
        const response = await fetch(`${API_BASE_URL}/student-data/${encodeURIComponent(openIdUsername)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch student data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching student data:', error);
        throw error;
    }
};
