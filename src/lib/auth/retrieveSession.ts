const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

interface UserData {
    email: string;
    joined: string,
    url: string,
  }

  function formatDateString(dateString : string) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString(); // Adjust the format based on your preference
    return formattedDate;
}

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function retrieveSession() {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            throw error;
        }

        const userData: UserData = {
            email: data.session.user.email,
            joined: formatDateString( data.session.user.email_confirmed_at ),
            url: data.session.user.id,
        }

          return userData;
    } catch (err) {
        console.error('Error retrieving session:', err);
        throw err;
    }
}
