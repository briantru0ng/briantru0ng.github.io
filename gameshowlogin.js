let API_BASE   = '';
let socket     = null;

(async () => {
  // 1. Ask the backend for its current public address
  const { url } = await fetch('/ngrok-url').then(r => r.json());

  // 2. Save & use it everywhere
  API_BASE = url;
  socket   = io(API_BASE);
})();

// login
async function loginUser() {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await res.json();
  if (data.success) {
    showGroupSelection(data.availableGroups);
  } else {
    alert('Login failed');
  }
}

