const clientId = "00f202463b524a7f8ab1137435e610e6";
const clientSecret = "21297eef120e44d9ac7fd8b947eb9edb";

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

