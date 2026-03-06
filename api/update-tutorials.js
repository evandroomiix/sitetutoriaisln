

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { tutorials } = req.body;

    if (!tutorials) {
        return res.status(400).json({ message: 'Missing tutorials data' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = 'evandroomiix';
    const REPO_NAME = 'sitetutoriaisln';
    const FILE_PATH = 'tutoriais_custom.json';
    const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

    if (!GITHUB_TOKEN) {
        return res.status(500).json({ message: 'GitHub token not configured' });
    }

    try {
        // Get the current file to get its SHA
        const fileRes = await fetch(API_URL, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!fileRes.ok) {
            // If the file doesn't exist, GitHub API returns 404, which is fine.
            // We'll create it. For other errors, we fail.
            if (fileRes.status !== 404) {
                const errorData = await fileRes.json();
                return res.status(fileRes.status).json({ message: 'Error fetching file from GitHub', details: errorData });
            }
        }
        
        const fileData = await fileRes.json();
        const sha = fileData.sha;

        // Prepare the new content
        const content = JSON.stringify({ tutoriais: tutorials, ultimaAtualizacao: new Date().toISOString() }, null, 2);
        const encodedContent = Buffer.from(content).toString('base64');

        // Update the file
        const updateRes = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Atualização automática dos tutoriais via site',
                content: encodedContent,
                sha: sha, // Required for updates
                branch: 'main'
            }),
        });

        if (!updateRes.ok) {
            const errorData = await updateRes.json();
            return res.status(updateRes.status).json({ message: 'Error updating file on GitHub', details: errorData });
        }

        res.status(200).json({ message: 'Tutorials updated successfully on GitHub' });

    } catch (error) {
        res.status(500).json({ message: 'An unexpected error occurred', details: error.message });
    }
};
