const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fpzrttavkfpjrzgjoivb.supabase.co';
const supabaseKey = 'tu-supabase-key';
const supabaseSecret = 'tu-supabase-secret';

const supabase = createClient(supabaseUrl, supabaseKey, supabaseSecret);

const getUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('email');

  if (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }

  return data;
};