javascript
    export default async function handler(req, res) {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
      }

      try {
        const { auth_token, session_id, castle_token, prompt, request_headers } = req.body;

        if (!auth_token || !session_id) {
          return res.status(400).json({ error: 'Dados incompletos' });
        }

        const response = await fetch('https://api.lovable.dev/api/generate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Cookie': `auth_token=${auth_token}; session_id=${session_id}; castle_token=${castle_token};`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Content-Type': 'application/json',
            ...request_headers
          },
          body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        return res.status(response.status).json(data);
      } catch (error) {
        return res.status(500).json({ error: 'Erro no proxy' });
      }
    }
