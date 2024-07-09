const API_URL = 'http://localhost:5000';
//Same as with server Port


export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);

    return response.json();
}

export async function createLogEntry(entry) {
    const logKey = entry.logKey;
    //The LOG_KEY is only in the header and visible 
    //for input in the form but not submitted.
    delete entry.logKey;

    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-LOG-KEY': logKey,
        },
        body: JSON.stringify(entry),
    });

    const json = await response.json();
    if (response.ok){
        return json;
    }
    const error = new Error(json.message);
    error.response = json;
    throw error;
}