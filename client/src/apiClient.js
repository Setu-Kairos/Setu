const API_BASE_URL = 'https://setu.onrender.com/api';

// Authenticate User (Student)
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

// Submit Student Form
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

// Fetch Student Data
export const fetchStudentData = async (openIdUsername) => {
    const token = localStorage.getItem('studentAuthToken');

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

// Register Counsellor
export const registerCounsellor = async (counsellorData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register-counsellor`, {
            method: 'POST',
            body:counsellorData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during counsellor registration:', error);
        throw error;
    }  
}; 

// Login Counsellor
export const loginCounsellor = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login-counsellor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during counsellor login:', error);
        throw error;
    }
};

// Fetch Counsellor Data
export const fetchCounsellorData = async () => {
    const token = localStorage.getItem('counsellorAuthToken');

    try {
        const response = await fetch(`${API_BASE_URL}/counsellor`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch counsellor data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching counsellor data:', error);
        throw error;
    }
};

export const fetchAllCounsellors = async () =>{
    const token = localStorage.getItem('studentAuthToken');
    try {
        const response = await fetch(`${API_BASE_URL}/counsellors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error('Failed to fetch counsellor data');
        }

        return await response.json();
    }catch (error) {
        console.error('Error fetching counsellor data:', error);
        throw error;
    }
}