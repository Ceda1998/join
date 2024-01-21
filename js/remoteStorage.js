const STORAGE_TOKEN = 'L12UFY9BAT0AZMLLBX5DBJ1S938BG7NTXIRW92EP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
    .then(res => res.json())
    //.then(console.log(res))
    .then(res => res.data.value)
}