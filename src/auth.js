const clientId = "e8277baef2e140c5a735836c9d75d286";
const clientSecret = "7063c4e3b5b8401b941fcf9ddbacfdc4";

// Utility function to introduce a delay between retries
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getAccessToken(retries = 3) {
    const credentials = btoa(`${clientId}:${clientSecret}`);
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        });
        if (!response.ok) throw new Error("Failed to fetch access token");
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error);
        
        if (retries > 0) {
            console.log(`Retrying to fetch access token... (${retries} retries left)`);
            await delay(1000); // Delay between retries (1 second)
            return getAccessToken(retries - 1);
        } else {
            console.error("Failed to obtain access token after several attempts.");
            return null; // Return null if failed after retries
        }
    }
}

export default getAccessToken;

