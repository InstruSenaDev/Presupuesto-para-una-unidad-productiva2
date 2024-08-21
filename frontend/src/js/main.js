import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fpzrttavkfpjrzgjoivb.supabase.co';
const supabaseKey = 'CalivsAmerica123'; // Reemplaza esto con la clave de Supabase de forma segura
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("Buscador");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe por defecto
  console.log("evento enviado");

  // Obtener los valores del formulario
  const buscar = document.getElementById("Buscar").value;

  // Buscar usuarios que coincidan con el nombre o documento
  try {
    console.log("preparando solicitud");
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .or(`nombre.ilike.%${buscar}%, documento.ilike.%${buscar}%`);
    
    console.log("busqueda enviada");

    if (error) {
      console.error("Error al buscar usuarios:", error);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
});
