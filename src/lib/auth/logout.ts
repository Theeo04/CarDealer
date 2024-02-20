const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Logout from session
export async function logout() {
    try {
        await supabase.auth.signOut();
        window.location.href = 'http://localhost:3000/';
    } catch (err) {
        console.error('Error signning out!', err);
        throw err;
    }
}
